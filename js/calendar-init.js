let calendar_element = document.querySelector(".calendar-container");
let calendar = new CalendarShell({container: calendar_element,
		categories: calendar_categories,
		month_names: calendar_monthnames,
		weekdays: calendar_weekdays,
		entries: calendar_entries });
calendar.setup();

let calendar_category_update = function(checkbox_id, category_id){
	let checkbox = document.querySelector(checkbox_id);
	calendar_categories[category_id].active = checkbox.checked;
	calendar.updateCategories();
}

let calendar_month_update = function(direction){
		let year_month = {}
		if (direction == "next") {
				year_month = calendar.nextPage();
		} else if (direction == "previous") {
				year_month = calendar.previousPage();
		} else if (direction == "now") {
				window.open("#", "_self");
				location.reload();
				return;
		}
		function pad(n, width, z) {
				z = z || '0';
				n = n + '';
				return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
		}
		let year = pad(year_month.year, 4);
		let month = pad(year_month.month, 2);
		let link = "#" + year + "-" + month;
		window.open(link, "_self");
		location.reload();

}

document.addEventListener('DOMContentLoaded', function() {
	for (let category_id of Object.keys(calendar_categories)){
		calendar_category_update("#cal-cat--"+ category_id +"-input", category_id);
	}
});
