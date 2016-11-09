Iterate = new function() {

	this.object = function (obj,func) {

		var answer;

			for (var prop in obj) {

				if(obj.hasOwnProperty(prop)){

					answer += func(prop,obj[prop],obj);

				}
			}

		return answer;
	};	

	this.array = function (array,func) {
		
		array.forEach(func);

	};


};
