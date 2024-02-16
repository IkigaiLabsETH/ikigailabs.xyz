import { showCreateBid, showListToken } from '../../modules/Collection/Token'
import { changeRoute } from '../app'
import { ListToken } from '../../modules/ListToken/ListToken'
import { CreateOffer } from '../../modules/CreateOffer'

export const openSlideUpActions = [showListToken, showCreateBid]
export const closeSlideUpActions = [changeRoute]

export const SLIDEUPS = {
  [showListToken.type]: (data: any) => <ListToken {...data} />,
  [showCreateBid.type]: (data: any) => <CreateOffer {...data} />,
}
