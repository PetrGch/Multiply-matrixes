$(document).ready(function(){
	
/* put data in input*/

$('.b-content :input').each(function (i) {
	$(this).data('key', $(this).attr('placeholder'))
});

/*size of cell and row*/

	var matrixes = function (val) {
		switch (val) {
			case "a_row":
				return $('.b-content__mat--mata tr').size();
			
			break
			case "a_cell":	
				return $('.b-content__mat--mata tr:last-child td').size();		 
			
			break
			case "b_row":
				return $('.b-content__mat--matb tr').size();

			break
			case "b_cell":
				return $('.b-content__mat--matb tr:last-child td').size();	
			
			break
		};
	};

/*equal of matrixes*/
	checkForEqual.listening = true;

	 function checkForEqual() {
		if (matrixes("a_cell") != matrixes("b_row")) {
			$('.bg-for-sidebar').animate({backgroundColor: '#f5c2c1'},300);
			$('.b-content__mat--mata :input, .b-content__mat--matb :input').attr('disabled', true);
			$('.b-sidebar__error').fadeTo(300, 1);
			$('.b-multiply').addClass('mainButtonDisable')
				checkForEqual.listening = false;
		} else {
			$('.bg-for-sidebar').animate({backgroundColor: '#ccc'},300);
			$('.b-content__mat--mata :input, .b-content__mat--matb :input').attr('disabled', false);
			$('.b-sidebar__error').fadeTo(300, 0);
			$('.b-multiply').removeClass('mainButtonDisable')
				checkForEqual.listening = true;
		}
	}

	/*focus and data*/

	var forFocus = function(val) {

		val.focus(function() {
			val.addClass('for-input-focus');
			$('.bg-for-sidebar').css('background', '#5099d9');
		});
		val.blur(function() {
			val.removeClass('for-input-focus');
			$('.bg-for-sidebar').css('background', '#ccc');
		});

		val.data('key', val.attr('placeholder'))
	}

	/*placeholder*/

	var placeh;
	var input = document.createElement('input');
	input.setAttribute('placeholder', 'placeholder');
	if(input.placeholder == 'placeholder') {
		placeh = true;
	} else {
		placeh = false;
	}
	
	$('.b-content :input').each(function() {
		forFocus($(this));
	});
		
		
/*		if (placeh == false) {
			var regV = /^[a|b|c]{1}\d{1}\S\d{1}$/
			$(this).data("val", $(this).attr('value'));
			$(this).attr('value', '');
			if (regV.test($(this).val())) $(this).val('');
		}
		

	$('.b-content :input').blur(function() {
		$(this).removeClass('for-input-focus');
		$('.bg-for-sidebar').css('background', '#ccc');

		if (placeh == false) {
			$(this).attr('value', $(this).data("val"));
	 		if ($(this).val() == '') $(this).val($(this).data("val"));
		};
	})*/

	/*add and remove*/

	function addRem(r, c) {
		if (r == 10) {
			$('.b-row__add').addClass('disabled_button');
		} else {
			$('.b-row__add').removeClass('disabled_button');
		}

		if (r == 2) {
			$('.b-row__rem').addClass('disabled_button');
		} else {
			$('.b-row__rem').removeClass('disabled_button');
		}

		if (c == 10) {
			$('.b-cell__add').addClass('disabled_button');
		} else {
			$('.b-cell__add').removeClass('disabled_button');
		}

		if (c == 2) {
			$('.b-cell__rem').addClass('disabled_button');
		} else {
			$('.b-cell__rem').removeClass('disabled_button');
		}
	}

	$('.b-select__mat-A').click(function () {

		addRem(matrixes("a_row"), matrixes("a_cell"));

	})

	$('.b-select__mat-B').click(function () {

		addRem(matrixes("b_row"), matrixes("b_cell"));

	})

/*add*/

	function matAdd(mat, val) {
		
		switch (val) {
			case "row":
				var sum = $('.b-content__mat--mat' + mat + ' ' + 'tr').size();
				var clon = $('.b-content__mat--mat' + mat + ' ' + 'tr:last-child').clone();
					
				if (sum < 10) {
					$('.b-content__mat--mat' + mat + ' ' + 'table').append(clon);
					$('.b-content__mat--mat' + mat + ' ' + 'tr:last-child :input').each(function (i) {
						var result_j = i + 1;
						$(this).val('');
						$(this).attr('placeholder', mat + (sum + 1) + "," + result_j);
							
						$('.b-row__rem').removeClass('disabled_button');

						forFocus($(this));
					});
				}; 

				if (sum == 9) {
					$('.b-row__add').addClass('disabled_button');
				};

				break
			case "cell":

				var sum = $('.b-content__mat--mat' + mat + ' ' + 'tr:last-child td').size();
				var clon = $('.b-content__mat--mat' + mat + ' ' + 'tr td:last').clone();

				if (sum < 10) {
					$('.b-content__mat--mat' + mat + ' ' + 'table tr').append(clon);
					$('.b-content__mat--mat' + mat + ' ' + 'table tr td:last-child :input').each(function (i) {
						var result_j = i + 1;
						$(this).val('');
						$(this).attr('placeholder', mat + result_j + "," + (sum + 1));

						$('.b-cell__rem').removeClass('disabled_button');

						forFocus($(this));

					})
				};

				if (sum == 9) {
					$('.b-cell__add').addClass('disabled_button');
				};	

				break	
		
		}

		checkForEqual();

	}

/*add row*/

	$('.b-row__add').click(function() {
		
		if ($('.b-select__mat-A:checked').val() == "A") {

			matAdd("a", "row");

			matAdd("c", "row");

		} else if($('.b-select__mat-B:checked').val() == "B") {

			matAdd("b", "row");
			
		};
	});

/*add column*/

	$('.b-cell__add').click(function() {

		if ($('.b-select__mat-A:checked').val() == "A") {

			matAdd("a", "cell");

		} else if ($('.b-select__mat-B:checked').val() == "B") {

			matAdd("b", "cell");

			matAdd("c", "cell");

		};

	});

/*remove*/

	function remRow(mat, val) {
		
		switch (val) {
			case "row":
				var remrow = $('.b-content__mat--mat' + mat + ' ' + 'tr').size();

				if (remrow > 2) {
					$('.b-content__mat--mat' + mat + ' ' + 'tr:last-child').remove();
					$('.b-row__add').removeClass('disabled_button');
				} 

				if (remrow == 3 || remrow == 2)	$('.b-row__rem').addClass('disabled_button');

				break
			case "cell":
				
				var remcell = $('.b-content__mat--mat' + mat + ' ' + 'tr:last-child td').size();

				if (remcell > 2) {
					$('.b-content__mat--mat' + mat + ' ' + 'td:last-child').remove();
					$('.b-cell__add').removeClass('disabled_button');
				} 

				if (remcell == 3 || remcell == 2)	$('.b-cell__rem').addClass('disabled_button');
				
				break		

		}

		checkForEqual();

	};

/*remove row*/	

	$('.b-row__rem').click(function() {
		
		if ($('.b-select__mat-A:checked').val() == "A") {

			remRow("a", "row");
			remRow("c", "row");

		} else if($('.b-select__mat-B:checked').val() == "B") {

			remRow("b", "row");
		};
	});

/*remove call*/

	$('.b-cell__rem').click(function() {
		
		if ($('.b-select__mat-A:checked').val() == "A") {

			remRow("a", "cell");

		} else if($('.b-select__mat-B:checked').val() == "B") {

			remRow("b", "cell");
			remRow("c", "cell");

		};
	});

/*clea matrix*/

	$('.b-mainact__clear').click(function() {
		$('.b-content :input').val('');	
	})

/*exchange matrix*/

	Position.listening = 'top';
	function Position () {
			if (Position.listening == 'top') {

				$('.b-content__mat--matb').after($('.b-content__mat--mata')).css('clear', 'none');

				Position.listening = 'bottom';
			} else {

				$('.b-content__mat--mata').after($('.b-content__mat--matb'));
				$('.b-content__mat--matb').css('clear', 'both');

				Position.listening = 'top';
			}
		};

	$('.b-mainact__change').click(function() {
		
		Position();
		
		$('.b-content__mat--mata').toggleClass('change_mat');
		
	});

/*multiply matrixes*/


	$('.b-sidebar__multiply').click(function() {

		if (checkForEqual.listening == true) {
				var matA_buf = [];		
				var matB_buf = [];

			$('.b-content__mat--matc :input').each(function () {

				var data_of_input = $(this).data('key');
				var i = parseInt(data_of_input.charAt(1));
				var j = parseInt(data_of_input.charAt(3));
	 			
					$('.b-content__mat--mata tr:eq('+ (i - 1) +') :input').each(function (a) {
						var checke = parseInt($(this).val());
							matA_buf[a] = checke;		
					});

					$('.b-content__mat--matb tr').each(function (tr) {
						var checke = parseInt($('.b-content__mat--matb tr:eq(' + tr + ') td:eq(' + (j - 1) + ') :input ').val());
							matB_buf[tr] = checke;	
					});	
				
				var result = 1;
				for (var ind = 0; ind < matA_buf.length && ind < matB_buf.length; ind++) {
					result *= matA_buf[ind] + matB_buf[ind]

				} 

				var reg = /^\d+/;
				if (reg.test(result)) {
					$(this).val(result);
				} else {
					$(this).val('');
					throw new Error("Wrong format of data: " + result);
				}
			});
		};

	});

});