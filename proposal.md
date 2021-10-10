# CS 4241 Final Project Proposal

## G3P Expense Tracker

### Yihong Xu

This is an interactive expense tracker application. A user can log in to record their spending/income and view them as a list. I will not be implementing all the proposed functionalities if time doesn't allow. Still, I already envisioned the background workings of all proposed functionalities.

## Functionalities

- [x] **Tags:** G3P Expense Tracker provides a convenient tagging system for users to categorize and view items related to each other. Users just need to note `#tagname` to tag an item. This creates a hyperlink on the hashtag in the note of the item, and clicking it allows users to view items tagged with the same tag only.
- [ ] **Category/Tag Groups:** Tags are great, but they can be hard to manage. This is why a nested tag structure would work better. A category is set of tags that can not exist along with another in a single item. For example, PaymentMethods/CreditCard would add a CreditCard tag under the PaymentMethods category to an item. No other tags from the same category will be identified for that item. This is to help statistics because an item can have multiple tags, but obviously, a pie chart can only show data that do not include others (can not show when an item is labeled as more than one tags). The user does not have to write extra for making that tag. They only have to mark a tag as part of a category on the tag management page. Only the first tag of a category will be recognized when calculating statistics. Other functions are not affected by having duplicate categories.
- [ ] **Statistics:** G3P Expense Tracker provides monthly statistics based on tags for users to better understand their cash flow.
	- [ ] Pie chart of that month's expenses under a certain category. (i.e., view by payment methods)
	- [ ] Bar chart of comparison of each days' recorded amounts in a month. Mobile users will have to scroll left when they want to view the entire chart.
	- [ ] Comparison is also available for comparing weeks and months, which is much more meaningful.
	- [ ] Ranking of items with the most amount in/out.
	- [x] Total in/out of that week/month/year
- [x] **Search:** G3P Expense Tracker contains a search function at the top-of-the-app bar.
- [x] **Mobile First:** G3P Expense Tracker is optimized for mobile users. The user interface and user experience are adjusted for mobile users. G3P Expense Tracker accommodates different devices/screens and adjusts immediately when the window size changes.
- [x] **Color Themes:** Users can select from a wide range of themes, including night themes, for G3P Expense Tracker to use. The website will remember the selection for as long as the user is logged in. Users can also choose to use different themes on different sessions/devices simultaneously.
- [ ] **Account System:** Improved security and privacy for the user. They can get email verifications for creating and resetting the password.
- [ ] **Folder System:** Users will be able to add data to different folders and view them separately.
- [x] **View System:** Users will be able to view data on pages based on customizable timeframes.
- [ ] **Currency System:** Users will be able to label transactions in different currencies and filter data with one or multiple currencies or have the currency converted back to their major currency for them when they add an item in the future. This is especially useful for people like me whose income source is in one currency but sometimes spends another. The two current options are manually converting or losing track, so I'm adding the third option.
- [ ] **CSV Export:** Users can download their data as .csv files
- More functionalities are in the mind and yet to come with user feedback from the last iteration. None of the current functionalities are promised to be implemented in the actual final project.

## Technologies

- Node.js with express as server
- mongoDB as database
- TailwindCSS as CSS framework
- This is a functionality oriented project. Technologies will be added according to the needs of functionalities.