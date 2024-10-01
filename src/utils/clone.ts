// como faço para saber o tipo do item que será passado? pode ser objeto, array ou data
//@ts-ignore
import cloneDeep from 'clone-deep'

/**
*	@description Função que clona um objeto, array ou data
*	@param {T} item - item a ser clonado
*	@returns {T} item clonado
*	@example
*	clone([1, 3, 4]) // [1, 3, 4]
*/
export const clone = <T>(item: T): T =>
	cloneDeep(item)
