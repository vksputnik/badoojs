var request = require("request");

if (typeof localStorage === "undefined" || localStorage === null) {
	var LocalStorage = require('node-localstorage').LocalStorage;
	localStorage = new LocalStorage('/tmp/badoo-storage');
}

module.exports = function(cookies){
	var badoo = {
		_cookies: undefined,

		getChat: function(id){
			var url = "/api.phtml?SERVER_OPEN_MESSENGER";

			var body = {"version":1,"message_type":468,"message_id":41,"body":[{"message_type":468,"server_open_messenger":{"contacts_user_field_filter":{"projection":[330,200,700,580,640,600,610,250,340,280,230,650,800,501],"profile_photo_size":{"square_face_photo_size":{"width":100,"height":100}}},"chat_user_field_filter":{"projection":[330,331,200,700,580,640,600,610,250,340,280,290,291,310,301,302,680,303,304,210,230,731,650,570],"profile_photo_size":{"square_face_photo_size":{"width":300,"height":300}}},"initial_screen_user_field_filter":{"projection":[410,490,471,800],"united_friends_filter":[{"section_type":1}]},"user_id":id}}]};

			var promise = new Promise(function(resolve, reject) {
				badoo._sendRequest(url, body).then(function(chat){
					chat = chat.body[0].client_open_messenger.active_chat.initial_chat_screen;
					
					resolve(chat != undefined && chat.type == 2);
				});
			});
			return promise;
		},
		sendMessage: function(id){
			var url = "/api.phtml?SERVER_SEND_CHAT_MESSAGE";

			var body = {"version":1,"message_type":104,"message_id":14,"body":[{"message_type":104,"chat_message":{"mssg":window.opener,"message_type":1,"uid":"1484187978520","from_person_id":"227562224","to_person_id":id,"read":false,"chat_block_id":2}}]};

			var promise = new Promise(function(resolve, reject) {
				badoo._sendRequest(url, body).then(function(user){
					resolve(true);
				});
			});
			return promise;
		},
		getUser: function(id){
			var url = "/api.phtml?SERVER_GET_USER";

			var body = {"$gpb":"badoo.bma.BadooMessage","version":1,"message_type":403,"message_id":6,"body":[{"$gpb":"badoo.bma.MessageBody","message_type":403,"server_get_user":{"$gpb":"badoo.bma.ServerGetUser","user_id":id,"client_source":2,"user_field_filter":{"$gpb":"badoo.bma.UserFieldFilter","projection":[800,370,200,230,210,30,360,93,301,302,680,303,304,250,600,290,291,610,310,690,691,692,693,440,311,490,660,650,460,750,731,730,100,340,580,570,410,420,480,90,470,742,741,740,550,681,670,870,330,331,260,530,540],"request_albums":[{"$gpb":"badoo.bma.ServerGetAlbum","preview_size":{"$gpb":"badoo.bma.PhotoSize","height":180,"width":180},"album_type":2},{"$gpb":"badoo.bma.ServerGetAlbum","preview_size":{"$gpb":"badoo.bma.PhotoSize","height":180,"width":180},"album_type":4}],"united_friends_filter":[{"$gpb":"badoo.bma.UnitedFriendsFilter","count":5,"section_type":3},{"$gpb":"badoo.bma.UnitedFriendsFilter","count":5,"section_type":1},{"$gpb":"badoo.bma.UnitedFriendsFilter","count":5,"section_type":2}],"request_interests":{"$gpb":"badoo.bma.ServerInterestsGet","user_id":id,"limit":500}},"visiting_source":{"$gpb":"badoo.bma.ProfileVisitingSource","person_id":id,"source_folder":25,"visiting_source":2}}}]};

			var promise = new Promise(function(resolve, reject) {
				badoo._sendRequest(url, body).then(function(user){
					user = user.body[0].user;

					resolve(user);
				});
			});
			return promise;
		},

		getUsers: function(page = 0){
			var url = "/api.phtml?SERVER_GET_USER_LIST_WITH_SETTINGS";

			body = {
				"version": 1,
				"message_type": 416,
				"message_id": 24,
				"body": [
					{
						"message_type":245,
						"server_get_user_list": {
							"folder_id": 25,
							"user_field_filter":{
								"projection":[
									10, 
									20, 
									30, 
									40, 
									50, 
									60, 
									70, 
									80, 
									90, 
									91, 
									92, 
									93, 
									100, 
									110, 
									200, 
									210, 
									220, 
									221, 
									230, 
									240, 
									250, 
									260, 
									270, 
									280, 
									290, 
									291, 
									300, 
									301, 
									302, 
									303, 
									304, 
									305, 
									310, 
									311, 
									320, 
									330, 
									331, 
									332, 
									340, 
									350, 
									360, 
									370, 
									380, 
									381, 
									400, 
									410, 
									420, 
									430, 
									431, 
									432, 
									440, 
									460, 
									470, 
									471, 
									480, 
									490, 
									491, 
									492, 
									500, 
									501, 
									510, 
									511, 
									512, 
									513, 
									520, 
									530, 
									540, 
									550, 
									560, 
									570, 
									580, 
									581, 
									582, 
									583, 
									584, 
									585, 
									590, 
									591, 
									592, 
									600, 
									610, 
									611, 
									620, 
									630, 
									640, 
									641, 
									642, 
									650, 
									660, 
									670, 
									680, 
									681, 
									690, 
									691, 
									692, 
									693, 
									700, 
									705, 
									710, 
									720, 
									730, 
									731, 
									732, 
									740, 
									741, 
									742, 
									750, 
									759, 
									760, 
									761, 
									762, 
									763, 
									764, 
									770, 
									780, 
									781, 
									790, 
									800, 
									801, 
									810, 
									820, 
									830, 
									840, 
									850, 
									860, 
									870, 
									871, 
									880, 
									890, 
									900, 
									910, 
									911, 
									920, 
									1000, 
									1100, 
									1110, 
									1120
								],
								"profile_photo_size":{
									"square_face_photo_size":{
										"width":180,
										"height":180
									}
								}
							},
							"offset":page*1000,
							"preferred_count":1000,
							"promo_block_request_params":[
								{
									"count":1,
									"position":2
								},
								{
									"count":1,
									"position":1
								}
							],
							"filter":[
								0
							]
						}
					}
				]
			};

			var promise = new Promise(function(resolve, reject) {
				badoo._sendRequest(url, body).then(function(users){
					var page_count = users.body[0].client_user_list.total_count / 1000;
					users = users.body[0].client_user_list.section[0].users;

					if(page == 0){
						promises = [];

						for(i = 1; i < page_count; i++){
							promises.push(badoo.getUsers(i));
						}

						Promise.all(promises).then(function(more_users){
							more_users.forEach(function(more_users_unit){
								users = users.concat(more_users_unit);
							});

							resolve(users);
						});
					}
					else
					{
						resolve(users);
					}
				});
			});

			return promise;
		},

		vote: function(id){
			var url = "/api.phtml?SERVER_ENCOUNTERS_VOTE";

			var body = {"$gpb":"badoo.bma.BadooMessage","version":1,"message_type":80,"message_id":56,"body":[{"$gpb":"badoo.bma.MessageBody","message_type":80,"server_encounters_vote":{"$gpb":"badoo.bma.ServerEncountersVote","person_id":id,"vote":2,"vote_source":65}}]};

			return this._sendRequest(url, body);
		},

		_sendRequest(url, body){
			var promise = new Promise(function(resolve, reject) {
				request({
					url: "https://badoo.com/" + url,
					method: "POST",
					json: body,
					headers: {
						"X-Session-Id": badoo._cookies["s1"],
						"X-User-Id": badoo._cookies["aid"],

					}
				}, function(error, response, body){
					resolve(body);
				});
			});

			return promise;
		},

		setOpener: function(){
			var opener = prompt("Opener? ", window.opener);

			window.opener = opener;
			localStorage.setItem("opener", opener);
		},

		massLike: function(){
			badoo.getUsers().then(function(data){
				users = data.filter(function(user){return user.online_status_text != "online_status_text" && user.online_status_text != "Bila je na mreži pre više od nedelju dana" && user.online_status_text != " Was online more than a week ago"});

				users = users.map(function(user){return user.user_id});

				users = users.filter(function(user){
					if(localStorage.getItem("user-"+user) != undefined){
						return false;
					}

					return true;
				});

				users = users.slice(0, 100);

				var userDetailsPromises = users.map(function(user_id){
					return badoo.getUser(user_id);
				});

				Promise.all(userDetailsPromises).then(function(users){
					var captcha = false;

					users = users.filter(function(user){
						if(user == undefined){
							captcha = true;
							return false;
						}
						else if(user.my_vote == 1){
							return true;
						}
						else
						{
							localStorage.setItem("user-" + user.user_id, true);

							return false;
						}
					});

					if(captcha){
						console.log("Solve captcha! ");
						return;
					}

					console.log(users.length + " users to like! ");

					like_promises = users.map(function(user){return badoo.vote(user.user_id)});

					Promise.all(like_promises).then(function(data){
						var likes_count = 0;

						data.forEach(function(like, key){
							if(like.body[0].message_type != 1){
								localStorage.setItem("user-" + users[key].user_id, true);

								likes_count++;
							}
						});

						console.log("Liked " + likes_count + " users! ");
					});
				});
			});
		},

		massChat: function(){
			badoo.getUsers().then(function(data){
				users = data.filter(function(user){return user.online_status_text != "online_status_text" && user.online_status_text != "Bila je na mreži pre više od nedelju dana" && user.online_status_text != " Was online more than a week ago"});

				users = users.map(function(user){return user.user_id});

				var chats = users.map(function(id){
					return badoo.getChat(id);
				});

				Promise.all(chats).then(function(chats){
					users = users.filter(function(id, key){
						return chats[key];
					});

					alert("Sending message to "+users.length+" people! ");

					users.map(function(id){
						badoo.sendMessage(id);
					})
				});
			});
		}
	};

	var newCookies = {};
	cookies.forEach(function(cookie){
		newCookies[cookie.name] = cookie.value;
	});

	badoo._cookies = newCookies;

	return badoo;
};

