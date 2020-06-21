class BatchPermissionChange extends BaseEntitySheet {
	constructor(entity,options){
		console.log(entity)
		super(entity,options);
		 this.content = null;
		 console.log('entity',this.entity)
        if (entity.data.content != "") {
            this.content = $("<div>" + entity.data.content + "</div>")
        }
	}
	 static get defaultOptions() {
        const options = super.defaultOptions;
        options.id = "batch-permissions";
        options.title = "Batch Change Permissions";
        options.classes = ["sheet","batch"];
        options.template = "/modules/BatchPermissionsByFolder/templates/batch-permission.html";
        options.width = 400;
        options.height = "auto";
        return options;
    }

	getData(){
		 const e = this.entity;
		 console.log(e)
	    // Configure permission levels
	    const defaultLevels = Object.entries(CONST.ENTITY_PERMISSIONS).map(level => {
	      let [n, l] = level;
	      return {level: l, name: n.titleCase()};
	    });
	    const playerLevels = [{level: "-1", name: "Default"}].concat(defaultLevels);

	    // Player users
	    const players = game.users.map(u => {
	      return {
	        user: u,
	        level: e.data.permission[u._id],
	        hidden: u.isGM
	      };
	    });

	    // Construct and return the data object
	    return {
	      entity: e,
	      defaultLevels: defaultLevels,
	      levels: playerLevels,
	      users: players
	    };
	}
    /* -------------------------------------------- */

  /** @override */
	async _updateObject(event, formData) {
	    event.preventDefault();
	    console.log(event, formData)
	    if (!game.user.isGM) throw "You do not have the ability to configure permissions.";
	    console.log('submit?')
	    // // Collect user permissions
	    const perms = {};
	    let entries = game.folders.get(this.entity.data.folder).content;
	    entries.forEach((entry)=>{
	    	for ( let [user, level] of Object.entries(formData) ) {
		      if ( name !== "default" && level === "-1" ) {
		        delete perms[user];
		        continue;
		      }
		      perms[user] = parseInt(level);
		    }

		    // // Update the entity
		    return entry.update({permission: perms}, {diff: false});
	    })
	    
	}
}

Hooks.on('init',()=>{
	//Object.define(Journal)
})
Hooks.on('getItemDirectoryFolderContext', (html,options)=>{

	console.log('test',html,options)
	options.push({
		name: "Batch Change Permissions",
		icon: '<i class="fas fa-check-square"></i>',
		condition: game.user.isGM,
		callback: header => {
				
                let folderID = header.parent().attr("data-folder-id");
                let folder = game.folders.get(folderID);
                if(folder.content.length > 0)
               		new BatchPermissionChange(folder.content[0]).render(true);
                console.log(folderID)
            }
	})
});
Hooks.on('getRollTableDirectoryFolderContext', (html,options)=>{

	console.log('test',html,options)
	options.push({
		name: "Batch Change Permissions",
		icon: '<i class="fas fa-check-square"></i>',
		condition: game.user.isGM,
		callback: header => {
				
                let folderID = header.parent().attr("data-folder-id");
                let folder = game.folders.get(folderID);
                if(folder.content.length > 0)
               		new BatchPermissionChange(folder.content[0]).render(true);
                console.log(folderID)
            }
	})
});
Hooks.on('getJournalDirectoryFolderContext', (html,options)=>{

	console.log('test',html,options)
	options.push({
		name: "Batch Change Permissions",
		icon: '<i class="fas fa-check-square"></i>',
		condition: game.user.isGM,
		callback: header => {
				
                let folderID = header.parent().attr("data-folder-id");
                let folder = game.folders.get(folderID);
                if(folder.content.length > 0)
               		new BatchPermissionChange(folder.content[0]).render(true);
                console.log(folderID)
            }
	})
});
console.log('batch permissions')


Hooks.on('renderBatchPermissionChange',(object,html,entity)=>{
	$('#batch-permission-control').on('submit',(e)=>{
		e.preventDefault();
		console.log('submit')
	})
})

/*
getEntryContext(html, options) {
	options.push({
    name: "Split Journal",
    icon: '<i class="fas fa-list-ul"></i>',
    condition: game.user.isGM,
    callback: header => {
        let entityId = header.attr("data-entity-id");
        let entity = game.journal.get(entityId);
        new FurnaceSplitJournal(entity).render(true);

    }
})

Folder ID: "LMvCOPgt7QKwYxAD"
        */

    