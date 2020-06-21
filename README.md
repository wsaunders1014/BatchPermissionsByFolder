# BatchPermissionsByFolder
Adds a context option to folders in Items, Journals, and RollTables to change the permission of each entity(Foundry's codeword for Item, Journal Entry, or Roll Table) inside the folder.

#WARNING: This will overwrite every permission inside the folder, and it's undoable.

There's a checkbox to disable player specific permissions. With it checked, any individual permissions will be set to whatever's in the form select box, whether or not you actively chose it. Unchecking it(the default) will only overwrite the Default permissions and leave individual permissions intact. The way Foundry permissions work is specific permissions override default, even if it the default is higher, so if you set an individual item to Observer for a player and then set all items to Owner, the player will still only have observable permission.

Larger folders might add a few seconds of lag while it processes. 
