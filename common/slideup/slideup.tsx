import { showListToken } from '../../modules/Collection/Token'
import { changeRoute } from '../app'
import { ListToken } from '../../modules/ListToken/ListToken'

export const openSlideUpActions = [showListToken]
export const closeSlideUpActions = [changeRoute]

export const SLIDEUPS = {
  [showListToken.type]: (data: any) => <ListToken {...data} />,
}
