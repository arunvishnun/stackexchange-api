
$(document).ready(function() {
	
	$('#search').click(function() {
		var url = 'http://api.stackexchange.com/2.2/search/advanced?page=1&pagesize=10&order=desc&sort=activity&q='+$('#query').val()+'&site=stackoverflow';
		 
		$.ajax({
		   type: 'GET',
		    url: url,
		    async: false,
		    jsonpCallback: 'jsonCallback',
		    contentType: "application/json",
		    dataType: 'jsonp',
		    success: function(json) {
		    	
		    	$.each(json.items, function(idx, obj) {
		    		console.log(obj.is_answered);
		    		
		    		$('#container').append(
		    				$('<div>').attr('class', 'row').data('question-id', obj.question_id)
		    					.append($('<div>').attr('class', 'cell1').html(idx + 1))
		    					.append($('<div>').attr('class', 'cell2').html(obj.title))
		    					.append($('<div>').attr('class', 'cell3').html(obj.answer_count))
		    					.append($('<div>').attr('class', 'cell4').html(obj.is_answered?'Yes':'No'))
		    		); 
		    			
		    	});
		    },
		    error: function(e) {
		       
		    }
		});
		
		
		$('#container').on('click', '.row',  function() {
			$(this).data('question-id');
			
			$.ajax({
				   type: 'GET',
				    url: 'http://api.stackexchange.com/2.2/questions/'+$(this).data('question-id')+'/answers?order=desc&sort=activity&site=stackoverflow',
				    async: false,
				    jsonpCallback: 'jsonCallback',
				    contentType: "application/json",
				    dataType: 'jsonp',
				    success: function(json) {
				    	console.log(json);
				    	
				    },
				    error: function(e) {
				       
				    }
				});
		});
		
		function jsonCallback() {
			
			
		}
	});
	
	
	
});