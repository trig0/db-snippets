var MongoClient = require('mongodb').MongoClient;


MongoClient.connect('mongodb://trig:cod1ng!@ds159517.mlab.com:59517/db-snippets', function(err, db) {
    if (err) {
        console.error(err);
        db.close();
        return;
    }
    console.log('Connected to MongoDB database');
    
    var collection = db.collection('snippets');

    var create = function(name, content) {
    	var snippet = {
    		name: "name",
    		content: "content"
    	};
    	collection.insert(snippet, function(err, result){
    		if (err) {
    			console.error("Could not create snippet", name);
    		} else {
				console.log("Created snippet", name);    			
    		}
    		db.close();
    	});
    };

    var read = function(name) {
    	var query = {
    		name: name
    	};
    	collection.findOne(query, function(err, snippet){
    		if (!snippet || err) {
    			console.error("Cannot read snippet", name);
    			db.close();
    			return;
    		}
    		console.log("Read snippet", snippet.name);
    		console.log(snippet.content);
    	db.close();
    	});
    };

    var update = function(name, content) {
        db.close();
    };

    var del = function(name, content) {
        db.close();
    };

    var main = function() {
        if (process.argv[2] == 'create') {
            create(process.argv[3], process.argv[4]);
        }
        else if (process.argv[2] == 'read') {
            read(process.argv[3]);
        }
        else if (process.argv[2] == 'update') {
            update(process.argv[3], process.argv[4]);
        }
        else if (process.argv[2] == 'delete') {
            del(process.argv[3]);
        }
        else {
            console.error('Command not recognized');
            db.close();
        }
    };

    main();
});