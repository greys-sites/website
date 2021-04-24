const fs = require('fs');
const path = require('path');

module.exports = (app) => {
	const index = fs.readFileSync(path.join(__dirname+'/../frontend/build/index.html'),'utf8');

	app.get('/',(req,res)=>{
		res.send(index
			.replace('$TITLE','Send Us into the Light')
			.replace('$DESC','Home of the Grey Skies')
			.replace('$TWITDESC','Home of the Grey Skies')
			.replace('$TWITTITLE','Send Us into the Light')
			.replace('$OGTITLE','Send Us into the Light')
			.replace('$OGDESC','Home of the Grey Skies')
			.replace(/\$IMAGE/g, 'https://greysdawn.com/official.png')
		);
	});

	app.get('/contact',(req,res)=>{
		res.send(index
			.replace('$TITLE','Contact | Send Us into the Light')
			.replace('$DESC','Home of the Grey Skies')
			.replace('$TWITDESC','Home of the Grey Skies')
			.replace('$TWITTITLE','Contact | Send Us into the Light')
			.replace('$OGTITLE','Contact | Send Us into the Light')
			.replace('$OGDESC','Home of the Grey Skies')
			.replace(/\$IMAGE/g, 'https://greysdawn.com/official.png')
		);
	});

	app.get('/blog',(req,res)=>{
		res.send(index
			.replace('$TITLE','Blog | Send Us into the Light')
			.replace('$DESC','Blog of the Grey Skies')
			.replace('$TWITDESC','Blog of the Grey Skies')
			.replace('$TWITTITLE','Blog | Send Us into the Light')
			.replace('$OGTITLE','Blog | Send Us into the Light')
			.replace('$OGDESC','Blog of the Grey Skies')
			.replace(/\$IMAGE/g, 'https://greysdawn.com/official.png')
		);
	});

	app.get('/blog/post/:hid',async (req,res)=>{
		var post = await app.stores.posts.get(req.params.hid);
		if(post) {
			res.send(index
				.replace('$TITLE', post.title + ' | Send Us into the Light')
				.replace('$DESC',post.short)
				.replace('$TWITDESC',post.short)
				.replace('$TWITTITLE',post.title+' | Send Us into the Light')
				.replace('$OGTITLE',post.title+' | Send Us into the Light')
				.replace('$OGDESC',post.short)
				.replace('$OEMBED','api/post/'+post.hid+"/oembed")
				.replace(/\$IMAGE/g, post.cover_url || 'https://greysdawn.com/official.png')
			);
		} else {
			res.send(index
				.replace('$TITLE', '404 | Send Us into the Light')
				.replace('$DESC','Post not found')
				.replace('$TWITDESC','Post not found')
				.replace('$TWITTITLE','404 | Send Us into the Light')
				.replace('$OGTITLE','404 | Send Us into the Light')
				.replace('$OGDESC','Post not found')
				.replace(/\$IMAGE/g, 'https://greysdawn.com/official.png')
			);
		}
	});

	// app.get('/project/:hid', async (req,res)=>{
	// 	var proj = await app.stores.projects.get(req.params.hid);
	// 	if(proj) {
	// 		res.send(index
	// 			.replace('$TITLE', proj.name+' | Send Us into the Light')
	// 			.replace('$DESC', 'Home of the Grey Skies')
	// 			.replace('$TWITDESC', 'Home of the Grey Skies')
	// 			.replace('$TWITTITLE', proj.name+' | Send Us into the Light')
	// 			.replace('$OGTITLE', proj.name+' | Send Us into the Light')
	// 			.replace('$OGDESC', 'Home of the Grey Skies')
	// 			.replace(/\$IMAGE/g, 'https://greysdawn.com/official.png')
	//		);
	// 	} else {
	// 		res.send(index
	// 			.replace('$TITLE', '404 | Send Us into the Light')
	// 			.replace('$DESC', 'Project not found')
	// 			.replace('$TWITDESC', 'Project not found')
	// 			.replace('$TWITTITLE', '404 | Send Us into the Light')
	// 			.replace('$OGTITLE', '404 | Send Us into the Light')
	// 			.replace('$OGDESC', 'Project not found')
	// 			.replace(/\$IMAGE/g, 'https://greysdawn.com/official.png')
	//		);
	// 	}
	// });

	app.get('/comics', async (req,res)=>{
		res.send(index
			.replace('$TITLE', 'Comics | Send Us into the Light')
			.replace('$DESC', 'Home of the Grey Skies')
			.replace('$TWITDESC', 'Home of the Grey Skies')
			.replace('$TWITTITLE', 'Comics | Send Us into the Light')
			.replace('$OGTITLE', 'Comics | Send Us into the Light')
			.replace('$OGDESC', 'Home of the Grey Skies')
			.replace(/\$IMAGE/g, 'https://greysdawn.com/official.png')
		);
	});

	app.get('/comics/:hid', async (req,res)=>{
		var comic = await app.stores.comics.get(req.params.hid);
		if(comic) {
			res.send(index
				.replace('$TITLE', comic.name+' | Send Us into the Light')
				.replace('$DESC', comic.tagline)
				.replace('$TWITDESC', comic.tagline)
				.replace('$TWITTITLE', comic.name+' | Send Us into the Light')
				.replace('$OGTITLE', comic.name+' | Send Us into the Light')
				.replace('$OGDESC', comic.tagline)
				.replace(/\$IMAGE/g, `https://greysdawn.com/${comic.hid}/thumb.png`)
			);
		} else {
			res.send(index
				.replace('$TITLE', 'Comic | Send Us into the Light')
				.replace('$DESC', 'Project not found')
				.replace('$TWITDESC', 'Comic not found')
				.replace('$TWITTITLE', '404 | Send Us into the Light')
				.replace('$OGTITLE', '404 | Send Us into the Light')
				.replace('$OGDESC', 'Comic not found')
				.replace(/\$IMAGE/g, 'https://greysdawn.com/official.png')
			);
		}
	});

	app.get('/flags', async (req,res)=>{
		res.send(index
			.replace('$TITLE', 'Flags | Send Us into the Light')
			.replace('$DESC', 'Home of the Grey Skies')
			.replace('$TWITDESC', 'Home of the Grey Skies')
			.replace('$TWITTITLE', 'Flags | Send Us into the Light')
			.replace('$OGTITLE', 'Flags | Send Us into the Light')
			.replace('$OGDESC', 'Home of the Grey Skies')
			.replace(/\$IMAGE/g, 'https://greysdawn.com/official.png')
		);
	});

	app.get('/flags/:hid', async (req,res)=>{
		var flag = await app.stores.flags.get(req.params.hid);
		if(flag) {
			res.send(index
				.replace('$TITLE', flag.name+' Flag | Send Us into the Light')
				.replace('$DESC', 'Home of the Grey Skies')
				.replace('$TWITDESC', 'Home of the Grey Skies')
				.replace('$TWITTITLE', flag.name+' Flag | Send Us into the Light')
				.replace('$OGTITLE', flag.name+' Flag | Send Us into the Light')
				.replace('$OGDESC', 'Home of the Grey Skies')
				.replace(/\$IMAGE/g, `https://greysdawn.com/${flag.hid}/thumb.png`)
			);
		} else {
			res.send(index
				.replace('$TITLE', '404 | Send Us into the Light')
				.replace('$DESC', 'Flag not found')
				.replace('$TWITDESC', 'Flag not found')
				.replace('$TWITTITLE', '404 | Send Us into the Light')
				.replace('$OGTITLE', '404 | Send Us into the Light')
				.replace('$OGDESC', 'Flag not found')
				.replace(/\$IMAGE/g, 'https://greysdawn.com/official.png')
			);
		}
	});
}