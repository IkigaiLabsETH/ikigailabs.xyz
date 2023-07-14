import { mintSuccess } from '../../modules/Drop'
import { hideModal } from '../../modules/Modal'
import { changeRoute } from '../app'

export const showConfettiActions = [mintSuccess]
export const hideConfettiActions = [hideModal, changeRoute]
