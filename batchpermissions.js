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
	    if (!game.user.isGM) throw "You do not have the ability to configure permissions.";
	    // // Collect user permissions
	    let changePlayer = formData.agree;
	    delete formData.agree;
	    
	    let entries = game.folders.get(this.entity.data.folder).content;
	    entries.forEach((entry)=>{
	    	let perms = {};
	    	if(!changePlayer){
				//Construct perm object from existing entry permission
				for ( let [gUser, gLevel] of Object.entries(entry.data.permission) ) {
					console.log(gUser,gLevel)
					perms[gUser] = parseInt(gLevel);
				}
				//Overwrite old Default with new one
				perms['default']=parseInt(formData.default);
			}else{
		    	for ( let [user, level] of Object.entries(formData) ) {
		    		console.log(user,level)
		    		/*
		    			If changePlayer is false, we need to grab the original permissions, because
		    			we are only changing default, and they'll be deleted.
		    		*/
	    		
	    		
			      if ( name !== "default" && level === "-1" ) {
			        delete perms[user];
			        continue;
			      }
			      perms[user] = parseInt(level);
			  }
		     // console.log(perms)
		    }

		    // Update the entity
		    return entry.update({permission: perms}, {diff: false});
	    })
	    
	}
}

Hooks.on('init',()=>{
	
	
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
                
            }
	})
});



Hooks.on('renderBatchPermissionChange',(object,html,entity)=>{
	$('#batch-permission-control').on('submit',(e)=>{
		e.preventDefault();
		
	});
	$('#player-change').on('change',(e)=>{
	
		if($('#player-change')[0].checked){
			$('.perm-select').removeAttr('disabled')
		}else{
			$('.perm-select').attr('disabled','disabled')
		}

	})
})
