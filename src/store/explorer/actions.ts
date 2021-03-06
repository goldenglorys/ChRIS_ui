import { action } from "typesafe-actions";
import { ExplorerActionTypes } from "./types";
import { FeedFile, PluginInstance } from "@fnndsc/chrisapi";

import UITreeNodeModel, {
  IUITreeNode,
} from "../../api/models/file-explorer.model";


export const setExplorerRequest = (
  files: FeedFile[],
  selected: PluginInstance
) =>
  action(
    ExplorerActionTypes.SET_EXPLORER_REQUEST,
    new UITreeNodeModel(files, selected).getTree()
  );


export const setSelectedFile = (
  selectedFile: IUITreeNode,
  selectedFolder?: IUITreeNode
) =>
  action(ExplorerActionTypes.SET_SELECTED_FILE, {
    selectedFile,
    selectedFolder,
  });


export const setSelectedFolder = (selectedFolder: IUITreeNode) =>
  action(ExplorerActionTypes.SET_SELECTED_FOLDER, selectedFolder);

export const toggleViewerMode = (isViewerOpened: boolean) =>
  action(ExplorerActionTypes.TOGGLE_VIEWER_MODE, isViewerOpened);

export const destroyExplorer = () =>
  action(ExplorerActionTypes.DESTROY_EXPLORER);
