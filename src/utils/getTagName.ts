import { TTagId, TZmTag } from "../types/zen-money-entities";

export const getTagName = (tags: TZmTag[], tagId: TTagId): string => {
    return tags.find(tag => tag.id === tagId)?.title || 'Без категории'
}