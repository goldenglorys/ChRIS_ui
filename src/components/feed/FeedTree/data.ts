import { PluginInstance } from "@fnndsc/chrisapi";

export interface Datum {
  id?: number;
  name?: string;
  parentId?: number;
  item?: PluginInstance;
  children: Datum[];
}

export interface Point {
  x: number;
  y: number;
}

export interface TreeNodeDatum extends Datum {
  children: TreeNodeDatum[];
  __rd3t: {
    id: string;
    depth: number;
    collapsed: boolean;
  };
}

export const getFeedTree = (items: PluginInstance[]) => {
  const tree = [],
    mappedArr: {
      [key: string]: TreeNodeDatum;
    } = {};

  items.forEach((item) => {
    const id = item.data.id;
    if (!mappedArr.hasOwnProperty(id)) {
      mappedArr[id] = {
        id: id,
        name: item.data.title || item.data.plugin_name,
        parentId: item.data.previous_id,
        item: item,
        children: [],
        __rd3t: {
          id: "",
          depth: 0,
          collapsed: false,
        },
      };
    }
  });

  for (const id in mappedArr) {
    let mappedElem;
    if (mappedArr.hasOwnProperty(id)) {
      mappedElem = mappedArr[id];

      if (mappedElem.parentId) {
        const parentId = mappedElem.parentId;
        if (parentId && mappedArr[parentId] && mappedArr[parentId].children)
          mappedArr[parentId].children.push(mappedElem);
      } else {
        tree.push(mappedElem);
      }
    }
  }
  return tree;
};
