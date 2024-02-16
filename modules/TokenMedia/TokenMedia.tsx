import React, {
  FC,
  SyntheticEvent,
  useState,
  useRef,
  LegacyRef,
  useEffect,
} from 'react'

import { getContentType, normalizeContentType } from '../../common/utils'
import { Loader } from '../Loader'
import Image from 'next/image'
import clsx from 'clsx'

type MediaType =
  | 'mp4'
  | 'mp3'
  | 'wav'
  | 'm4a'
  | 'mov'
  | 'gltf'
  | 'glb'
  | 'png'
  | 'jpeg'
  | 'jpg'
  | 'svg'
  | 'gif'
  | 'html'
  | 'other'
  | undefined

export const extractMediaType = (tokenMedia?: string): MediaType | null => {
  let extension: string | null = null
  if (tokenMedia) {
    const pieces = tokenMedia.split('/')
    const file =
      pieces && pieces[pieces.length - 1] ? pieces[pieces.length - 1] : null
    const matches = file ? file.match('(\\.[^.]+)$') : null
    extension = matches && matches[0] ? matches[0].replace('.', '') : null
  }
  return (extension as MediaType) ? (extension as MediaType) : null
}



type Props = {
  token?: any
  staticOnly?: boolean
  imageResolution?: 'small' | 'medium' | 'large'
  modelViewerOptions?: any
  onError?: (e: Event) => void
}

export const TokenMedia: FC<Props> = ({
  token,
  staticOnly,
  imageResolution,
  modelViewerOptions = {},
  onError = () => {},
}) => {
  const [detectingMediaType, setDetectingMediaType] = useState(false)
  const [mediaType, setMediaType] = useState<MediaType | null>(null)
  const mediaRef = useRef<HTMLAudioElement | HTMLVideoElement>(null)
  const media = token?.media
  const tokenImage = (() => {
    switch (imageResolution) {
      case 'small':
        return token?.imageSmall
      case 'large':
        return token?.imageLarge
      case 'medium':
      default:
        return token?.image
    }
  })()

  useEffect(() => {
    setDetectingMediaType(true)
    let abort = false
    let type = extractMediaType(token?.media)

    if (!type && token?.media) {
      
      getContentType(token.media)
        .then((contentType) => {
          if (contentType && !abort) {
            const normalizedContentType = normalizeContentType(contentType)
            type = extractMediaType(`.${normalizedContentType}`)
            setMediaType(type)
          }
        })
        .finally(() => {
          setDetectingMediaType(false)
        })
    } else {
      setMediaType(type)
      setDetectingMediaType(false)
    }
    return () => {
      abort = true
      setDetectingMediaType(false)
    }
  }, [token?.media])

  useEffect(() => {
    if (mediaRef && mediaRef.current) {
      mediaRef.current.load()
    }
  }, [media])

  if (!token && !staticOnly) {
    console.warn('A token object or a media url are required!')
    return null
  }

  if (detectingMediaType) {
    return <Loader />
  }

  const onErrorCb = (e: SyntheticEvent) => {
    onError(e.nativeEvent)
  }

  if (staticOnly || !media) {
    return (
      <Image
        src={tokenImage}
        title={token.name as string}
        alt={token.name as string}
        fill={true}
        style={{ maxHeight: '85vh' }}
        className="border-yellow border-4 shadow-[6px_6px_0px_0px_rgba(249,212,0,1)] w-auto relative"
      />
    )
  }

  // VIDEO
  if (mediaType === 'mp4' || mediaType === 'mov') {
    return (
      <div className='border-yellow border-4 shadow-[6px_6px_0px_0px_rgba(249,212,0,1)] w-auto relative'>
        <video
          className={clsx('max-h-[85vh]')}
          poster={tokenImage}
          controls={true}
          loop
          playsInline
          onError={onErrorCb}
          ref={mediaRef as LegacyRef<HTMLVideoElement>}
        >
          <source src={media} type="video/mp4" />
          Your browser does not support the
          <code>video</code> element.
        </video>
      </div>
    )
  }

  // AUDIO
  if (mediaType === 'wav' || mediaType === 'mp3' || mediaType === 'm4a') {
    return (
        <audio
          src={media}
          onError={onErrorCb}
          ref={mediaRef}
          controls={true}
          style={{
            position: 'absolute',
            bottom: 16,
            left: 16,
            width: 'calc(100% - 32px)',
          }}
        >
          Your browser does not support the
          <code>audio</code> element.
        </audio>
    )
  }

  // 3D
  if (mediaType === 'gltf' || mediaType === 'glb') {
    return (
      //@ts-ignore
      <model-viewer
        src={media}
        ar
        ar-modes="webxr scene-viewer quick-look"
        poster={tokenImage}
        seamless-poster
        shadow-intensity="1"
        camera-controls
        enable-pan
        {...modelViewerOptions}
        className="border-yellow border-4 shadow-[6px_6px_0px_0px_rgba(249,212,0,1)] w-auto relative"
        onError={onErrorCb}
        //@ts-ignore
      ></model-viewer>
    )
  }

  //Image
  if (
    mediaType === 'png' ||
    mediaType === 'jpeg' ||
    mediaType === 'jpg' ||
    mediaType === 'gif'
  ) {
    return (
      <Image
        src={media}
        title={token.name as string}
        alt={token.name as string}
        fill={true}
        style={{ maxHeight: '85vh' }}
        className="border-yellow border-4 shadow-[6px_6px_0px_0px_rgba(249,212,0,1)] w-auto relative"
      />
    )
  }

  // HTML
  if (
    mediaType === 'html' ||
    mediaType === null ||
    mediaType === undefined ||
    mediaType === 'other' ||
    mediaType === 'svg'
  ) {
    return (
      <iframe
        className="border-yellow border-4 shadow-[6px_6px_0px_0px_rgba(249,212,0,1)] w-auto relative"
        src={media}
        sandbox="allow-scripts"
      ></iframe>
    )
  }

  return (
    <Image
        src={tokenImage}
        title={token.name as string}
        alt={token.name as string}
        fill={true}
        style={{ maxHeight: '85vh' }}
        className="border-yellow border-4 shadow-[6px_6px_0px_0px_rgba(249,212,0,1)] w-auto relative"
      />
  )
}
