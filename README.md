# Jekyll Calendar
__For a live example, head [here](https://abzicht.github.io/jekyll-calendar/)__

HTML and JavaScript calendar for Jekyll based calendar entries.

All Jekyll related data is located in `_data/calendar`.

## Entries
All entries are stored in `_data/calendar/entries.yml`.

Exemplary entry:
```yml
- id: "a"
  name: "Rhoncus"
  description: "Eni sagittis lacinia lectus primis. Elit iaculis hendrerit sapien elementum ultrices augue. Fusce suspendisse ultrices nunc. Potenti, scelerisque cras duis volutpat vulputate eros cras. Congue aliquam gravida lectus neque sed. Proin. Penatibus donec quam facilisi nascetur dolor praesent id, auctor pretium eros quam nibh. Luctus nullam maecenas suspendisse mus. Rutrum eros id lorem aenean elit, condimentum. Sollicitudin in, donec dictumst enim, nec duis. Ac dictum lacus commodo nam suscipit aliquam, consectetuer auctor velit. Aliquet amet, dis sapien quisque, egestas quis a. Nec in quis. Cras nec gravida."
  category: "election"
  singular: false
  date: "0000-01-01"
```
If an event is marked singular, it only appears in the year it is created for.
If it is not singular, it appears in each year.

__Notice:__ If multiple events are created for the same month and day, use
unique `id`s!

For each unique category, a category entry must be created in `_data/calendar/categories.yml`.
The category id must match the id used by the entries. The color tag is
utilized to color the calendar entries of the corresponding category.
```yml
- id: birthday
  name: Geburtstag
  color: "#0000ee"
```

The calendar entries can be filtered by category.

## Setup
Copy directories `_data`, `_includes`, `css`, and `js` to your Jekyll project.

Write
```jekyll
{% include calendar.html %}
{% include calendar_categories.html %}
```
in the file you want to include the calendar in.

Add
```html
<script src="/js/calendarbase.esm.js"></script>
<script src="/js/calendar-entries.js"></script>
<script defer src="/js/calendar-shell.js"></script>
<script defer src="/js/calendar-init.js"></script>
```
to the bottom of the file you included the calendar at.

## Sources

* [JS Calendar library](https://github.com/WesSouza/calendar-base)
* [Original HTML & CSS styling](https://codepen.io/knyttneve/pen/QVqyNg)
