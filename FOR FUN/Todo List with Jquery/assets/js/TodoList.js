//check off todo list
$("ul").on("click", "li", function(){
	$(this).toggleClass("completed");
});

//click on x delete todo
$("ul").on("click", "span", function(event){
	$(this).parent().fadeOut(500, function(){
		$(this).remove();
	});
	event.stopPropagation();
})

$("input[type='text']").keypress(function(event){
	if(event.which == 13){
		//hole the text from the input
		let newtodo = $(this).val();

		if(newtodo == ""){
			return;
		}
		//empty the text form the input
		$(this).val("");				
		//create new li
		$("ul").append("<li><span><i class='fa fa-trash'></i></span> " + newtodo + "</li>");

	}
})

$(".fa-plus").click(function(){
	$("input[type='text']").fadeToggle();
})