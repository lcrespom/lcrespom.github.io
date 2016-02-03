$(function() {
	var verbs = [
		/*
		["be", "was/were", "been"],
		["become", "became", "become"],
		["begin", "began", "begun"],
		["bite", "bit", "bitten"],
		["break", "broke", "broken"],
		["bring", "brought", "brought"],
		["build", "built", "built"],
		["buy", "bought", "bought"],
		["can", "could", "been able to"],
		["catch", "caught", "caught"],
		["choose", "chose", "chosen"],
		["come", "came", "come"],
		["cost", "cost", "cost"],
		["cut", "cut", "cut"],
		["dig", "dug", "dug"],
		["do", "did", "done", ],
		["draw", "drew", "drawn"],
		["dream", "dreamt", "dreamt"],
		["drink", "drank", "drunk"],
		["drive", "drove", "driven"]*/
		/*
		["leave", "left", "left"],
		["let", "let", "let"],
		["lose", "lost", "lost"],
		["make", "made", "made"],
		["mean", "meant", "meant"],
		["meet", "met", "met"],
		["pay", "paid ", "paid"],
		["put", "put", "put"],
		["read", "read", "read"],
		["ride", "rode", "ridden"],
		["ring", "rang", "rung"],
		["run", "ran", "run"],
		["say", "said", "said"],
		["see", "saw", "seen"],
		["send", "sent", "sent"],
		["set", "set", "set"],
		["shoot", "shot", "shot"]*/
		["sing","sang","sung"],
		["sit","sat","sat"],
		["sleep","slept","slept"],
		["smell","smelt","smelt"],
		["speak","spoke","spoken"],
		["spend","spent","spent"],
		["stand","stood","stood"],
		["steal","stole","stolen"],
		["swear","swore","sworn"],
		["swim","swam","swum"],
		["take","took","taken"],
		["teach","taught","taught"],
		["tell","told","told"],
		["think","thought","thought"],
		["throw","threw","thrown"],
		["understand","understood","understood"],
		["wake","woke","woken"],
		["wear","wore","worn"],
		["win","won","won"],
		["write", "wrote", "written"]
	];
	var rights = 0;
	var wrongs = 0;
	var WAIT = 600;

	function random(num) {
		return Math.floor(Math.random() * num);
	}

	function askQuestion() {
		var vnum = random(verbs.length);
		var tnum = random(3);
		var verb = verbs[vnum][tnum];
		$('.question .infinitive').text(tnum == 0 ? verb : '');
		$('.question .past').text(tnum == 1 ? verb : '');
		$('.question .participle').text(tnum == 2 ? verb : '');
		$('.score').addClass('hidden');
		$('.question-mark').removeClass('hidden').one('click', function() {
			showAnswer(verbs[vnum]);
		});
	}

	function showAnswer(verb) {
		$('.score').removeClass('hidden');
		$('.question-mark').addClass('hidden');
		$('.question .infinitive').text(verb[0]);
		$('.question .past').text(verb[1]);
		$('.question .participle').text(verb[2]);
	}

	function registerButtons() {
		$('.right').on('click', function() {
			rights++;
			$('.right span').text('' + rights);
			setTimeout(askQuestion, WAIT);
		});
		$('.wrong').on('click', function() {
			wrongs++;
			$('.wrong span').text('' + wrongs);
			setTimeout(askQuestion, WAIT);
		});
	}

	registerButtons();
	askQuestion();
});