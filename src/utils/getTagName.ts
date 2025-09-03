import { TTagId, TZmTag } from "../types/zen-money-entities";

export const getTagById = (tagId: TTagId, tags?: TZmTag[],): TZmTag => {
    const tag = tags?.find(tag => tag.id === tagId);
    if (!tag) {
        throw new Error('tag not found!')
    }
    return tag;
}