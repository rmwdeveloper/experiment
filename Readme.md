# Windows XP in HTML, Javascript, and CSS

## Desktop Spec
* The desktop will be a grid of possible drag and drop targets where icons can be dropped. Grid will be a
2d array of cells.
* Multiple objects can be selected, dragged, and dropped at a time. Items repositioned in this manner
will fall into the closest available cells.
* Icons will not move until they are dropped. A partially transparent icon will appear next to the mouse when
the drag is in progress.

##File Spec
* Every "File" or "Folder" object will be wrapped in a Base File Taskbar HOC that handles minimizing
the file to the start taskbar, maximizing it to fill available screen space, or closing the file.
* Individuial file and folder types will provide their own secondary taskbar that will be placed directly below the base
file taskbar.

##Filesystem Spec

* For now, simple tree data structure. Nodes with children are directories, and endpoints are files. Metadata
is stored flatly in the tree (Permissions, filenames, etc).

* File permissions 