/* eslint-disable react/jsx-props-no-spreading */

import { match } from 'ts-pattern'

import { Layout } from '../types'
import { MainLayout } from './MainLayout'
import { SkeletonLayout } from './SkeletonLayout'

export const withLayout =
  (layout: Layout) =>
  <P extends Record<string, unknown>>(Component: React.ComponentType<P>): React.FC<P> =>
  (props: P) =>
    match(layout)
      .with(Layout.main, () => (
        <MainLayout>
          <Component {...props} />
        </MainLayout>
      ))
      .with(Layout.skeleton, () => (
        <SkeletonLayout>
          <Component {...props} />
        </SkeletonLayout>
      ))
      .exhaustive()
