import { Hume } from "hume"
import { ToolErrorMessage, ToolResponseMessage } from "hume/api/resources/empathicVoice";

async function fetchPriceData(currency: string) {
  const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${currency}&vs_currencies=usd`);
  const data = await response.json();
  
  return data[currency].usd;
}

export async function handleToolCallMessage(
  toolCallMessage: Hume.empathicVoice.ToolCallMessage): Promise<any> {
  if (toolCallMessage.name === "coingecko") {
    try{
      // parse the parameters from the ToolCall message
      const args = JSON.parse(toolCallMessage.parameters) as {
        currency: string;
      };

      // extract the individual arguments
      const { currency } = args;

      // call weather fetching function with extracted arguments
      const price = await fetchPriceData(currency);

      // send ToolResponse message to the WebSocket
      const toolResponseMessage = {
        type: "tool_response",
        toolCallId: toolCallMessage.toolCallId,
        content: price.toString(),
      };

      // socket?.sendToolResponseMessage(toolResponseMessage);
      return toolResponseMessage;
    } catch (error) {
      // send ToolError message to the WebSocket if there was an error fetching the weather
      const cryptoPriceToolErrorMessage = {
        type: "tool_error",
        toolCallId: toolCallMessage.toolCallId,
        error: "Crypto Price tool error",
        content: "There was an error with the crypto price tool",
      };
      console.log(cryptoPriceToolErrorMessage);

      return cryptoPriceToolErrorMessage;
    }
  } else {
    // send ToolError message to the WebSocket if the requested tool was not found
    const toolNotFoundErrorMessage = {
      type: "tool_error",
      toolCallId: toolCallMessage.toolCallId,
      error: "Tool not found",
      content: "The tool you requested was not found",
    };

    return toolNotFoundErrorMessage;
  }
}
