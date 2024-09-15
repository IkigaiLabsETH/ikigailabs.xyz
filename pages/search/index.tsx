/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useEffect, useRef, useState, FormEvent, useCallback } from 'react';
import Blobs from './Blobs';
import { useRouter } from 'next/navigation';
import {
  createCustomMemory,
  deleteMemory,
  getMemories,
  getSearchResultsFromMemory,
} from "../../actions/memo-actions";
import { BingResults } from "../../ama/types/search/search-types";
import { useChat } from "ai/react";
import Markdown from "react-markdown";
import {
  Credenza,
  CredenzaBody,
  CredenzaClose,
  CredenzaContent,
  CredenzaDescription,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from "../../ama/search/ui/credenza";
import { useSearchParams } from "next/navigation";
import WebReferences from "../../ama/search/web-references";

function ChatPage() {
  // Remove user-related state and functions

  const searchParams = useSearchParams();

  const initialQuery = searchParams.get("q") ?? "";

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    append,
    setInput,
  } = useChat();

  const [customUserMemory, setCustomUserMemory] = useState<string | null>(null);

  const [userMemories, setUserMemories] = useState<
    { memory: string; id: string }[]
  >([]);

  const [searchResultsData, setSearchResultsData] = useState<BingResults | null>(null);

  // Handling Memory Submit
  const handleMemorySubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!customUserMemory) return;
    try {
      const memory = await createCustomMemory(customUserMemory, user);
      // @ts-ignore
      setUserMemories([...userMemories, memory]);
    } catch (error) {
      console.error('Error creating memory:', error);
    }
  };

  const fetchSearch = useCallback(async (
    query: string,
    e?: React.FormEvent<HTMLElement> | React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    e?.preventDefault();
    e?.type === "keydown" && e.stopPropagation();

    const data = await getSearchResultsFromMemory(query, user);
    if (!data) return;

    setSearchResultsData(data);

    if (!e) {
      append({
        role: "user",
        content: query,
      }, {
        body: {
          data,
          input: query
        }
      })
    }

    handleSubmit(e, { body: { data, input: query } });

    return data;
  }, [append, handleSubmit]);

  const initialRender = useRef(true);

  useEffect(() => {
    if (initialRender.current && initialQuery) {
      initialRender.current = false;
      setInput(initialQuery);
      fetchSearch(initialQuery);
    }
  }, [initialQuery, fetchSearch, setInput]);

  const router = useRouter()

  return (
    <div className="relative h-screen">
      <div className="absolute flex max-h-screen h-full overflow-hidden items-center justify-center w-full -z-10 blur-xl">
        <Blobs />
      </div>
      {!searchResultsData && (
        <div className="absolute flex min-h-screen items-start justify-center w-full -z-10">
        </div>
      )}

      <main className="min-h-screen flex flex-col items-center justify-between p-4 md:p-24">
        <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
          <div className="flex flex-col gap-4 w-full lg:flex-row lg:items-center lg:justify-between">

            {searchResultsData && (
              <button
                onClick={() => {
                  router.push('/');
                }}
              >
                Home
              </button>
            )}

            {!searchResultsData && (
              <div className="fixed bottom-0 left-0 flex flex-col gap-4 h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">

              </div>
            )}
          </div>

          {searchResultsData ? (
            <div className="flex flex-col gap-4 items-start max-w-3xl w-full mt-32 md:mt-8">
              {messages.map((message, i) => (
                <div key={`message-${i}`} className="w-full max-w-3xl flex flex-col gap-2">
                  {message.role === 'user' ? (
                    <div className="flex gap-4 font-bold text-2xl">
                      <img
                        src="/user-placeholder.svg"
                        className="rounded-full w-10 h-10 border-2 border-primary-foreground"
                        alt="User profile picture"
                      />
                      <span>{message.content}</span>
                    </div>
                  ) : (
                    <div>
                      <WebReferences searchResults={searchResultsData} />
                      <div className="prose lg:prose-xl" key={message.id}>
                        <Markdown>{message.content}</Markdown>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-4 w-full items-center justify-center">
              <div className="text-4xl md:text-6xl mt-20">SUPER MEMORY</div>

              <form
                id="search-form"
                onSubmit={async (e) => {
                  await fetchSearch(input, e);
                }}
                className="flex relative gap-2 max-w-xl w-full"
              >
                <textarea
                  value={input}
                  onChange={handleInputChange}
                  name="query"
                  cols={2}
                  placeholder="What are you looking for?"
                  className="rounded-xl font-sans max-w-xl w-full border border-blue-500/50 p-4 bg-white bg-opacity-30 backdrop-blur-xl min-h-20"
                  //   keydown listener to submit form on enter
                  onKeyDown={async (e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      await fetchSearch(input, e);
                    }
                  }}
                />

                <button
                  type="submit"
                  className="absolute top-4 right-4 rounded-lg bg-black text-white p-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m8.25 4.5 7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </button>
              </form>
            </div>
          )}

          <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left"></div>
        </div>

        {searchResultsData ? (
          <div className="flex flex-col gap-4 items-start max-w-3xl w-full mt-32 md:mt-8">
            {messages.map((message, i) => (
              <div key={`message-${i}`} className="w-full max-w-3xl flex flex-col gap-2">
                {message.role === 'user' ? (
                  <div className="flex gap-4 font-bold text-2xl">
                    <img
                      src="/user-placeholder.svg"
                      className="rounded-full w-10 h-10 border-2 border-primary-foreground"
                      alt="User profile picture"
                    />
                    <span>{message.content}</span>
                  </div>
                ) : (
                  <div>
                    <WebReferences searchResults={searchResultsData} />
                    <div className="prose lg:prose-xl" key={message.id}>
                      <Markdown>{message.content}</Markdown>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-4 w-full items-center justify-center">
            <div className="text-4xl md:text-6xl mt-20">SUPER MEMORY</div>

            <form
              id="search-form"
              onSubmit={async (e) => {
                await fetchSearch(input, e);
              }}
              className="flex relative gap-2 max-w-xl w-full"
            >
              <textarea
                value={input}
                onChange={handleInputChange}
                name="query"
                cols={2}
                placeholder="What are you looking for?"
                className="rounded-xl font-sans max-w-xl w-full border border-blue-500/50 p-4 bg-white bg-opacity-30 backdrop-blur-xl min-h-20"
                //   keydown listener to submit form on enter
                onKeyDown={async (e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    await fetchSearch(input, e);
                  }
                }}
              />

              <button
                type="submit"
                className="absolute top-4 right-4 rounded-lg bg-black text-white p-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>
            </form>
          </div>
        )}

        <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left"></div>
      </main>
    </div>
  );
}

export default ChatPage;
