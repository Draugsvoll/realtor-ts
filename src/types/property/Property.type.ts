import type {PropertyRent} from './PropertyRent.type'
import type {PropertyBuy} from './PropertyBuy.type'

export type Property = PropertyRent | PropertyBuy
export type BuyOrRent = 'rent' | 'buy'

