---
---

let calendar_categories = {
	{% for category in site.data.calendar.categories %}
	{{ category.id }}: {
		"name":  "{{ category.name }}",
		"color": "{{ category.color }}",
		"active": true
	},
	{% endfor %}
};

let calendar_entries = {
	{% for month in site.data.calendar.months %}
	"{{month.id}}": [
		{% for entry in site.data.calendar.entries %}
			{% assign entry_month = entry.date | date: "%m" | plus: 0 %}
			{% if entry_month == month.id %}
				{
					"id": "{{entry.id}}",
					"name": "{{entry.name}}",
					"description": "{{entry.description}}",
					"category": "{{entry.category}}",
					"singular": {{entry.singular}},
					"date": "{{entry.date}}"
				},
			{% endif %}
	{% endfor %}],
	{% endfor %}
};

let calendar_weekdays = [
	{% for weekday in site.data.calendar.weekdays %}
	{
		"name": "{{weekday.name}}",
			"abbreviation": "{{weekday.abbreviation}}",
	},
	{% endfor %}
];
let calendar_monthnames = [
	{% for month in site.data.calendar.months %}
	{
		"name": "{{month.name}}",
		"abbreviation": "{{month.abbreviation}}",
	},
	{% endfor %}
];
