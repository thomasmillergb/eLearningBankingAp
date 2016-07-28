/**
 * Created by Thomas on 28/07/2016.
 */


function startQuiz(quiz) {


//	d3.select('.quiz-container').append('h3').text('hello');

	_.forEach(quiz, function (question, i) {
		var container = d3.select('.quiz-container')
			.append('div')
			.classed('question-container', true);
		container
			.append('h3')
			.text(question.question);
		var q = container
			.append('div')
			.classed('questions', true)
			.selectAll('div.q')
			.data(question.options)
			.enter()
			.append('div.q');
		q
			.append('input')
			.attr("type", "radio")
			.attr("name", i)
			.attr("value", function (d) {
				return d.value !== undefined ? d.value : false;
			});
		q
			.append('p')
			.text(function (d) {
				return d.text;
			});
	});
	d3.select('.quiz-container')
		.append('button')
		.attr('class','btn btn-primary dropdown-toggle')
		.text('Am i right?')
		.on('click', function () {
			// var correct = d3.select('.quiz-container')
			// 	.selectAll('input:checked').data();
			//obs._groups[0][0].value
			var obs = d3.select('.quiz-container')
				.selectAll('input:checked');
			var correctAmount = 0;
			_.forEach(obs._groups[0], function (o) {
				v = o.value;
				if(v == true){
					correctAmount++;
				}
			});
			var totalQuestions = quiz.length;
			allCorrect = correctAmount.length === totalQuestions;

			var summary = d3.select('.summary');
			summary.html('');
			var verb = allCorrect ? 'RIGHT!!!' : 'incorrect.';
			summary.append('p').text('You got ' + correctAmount + ' out of ' + totalQuestions);
			summary.append('p').text('You got it '+ verb);
		});

}