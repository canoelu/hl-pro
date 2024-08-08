import { singleton } from '@hl/utils'

import Action from '../base/action'

const State = singleton(Action)

export function useAction() {
  return new State() as Action
}
