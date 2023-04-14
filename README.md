## 2023 NBA Playoff Tracker

This is an API to expose teams in the current NBA playoffs

Here are the request methods:

`/teams` - GET
- Returns a list of all teams from this years NBA playoffs

`/teams/:id` - GET
- Return a single team by its id
- example response from /baskets/2:
```
    {
			"id": "2",
			"team": "Phoenix Suns",
			"conference": "Western"
	}
```

`/teams` - POST
- Accepts a team object
- example object
```
    {
			"id": "2",
			"team": "Phoenix Suns",
			"conference": "Western"
	}
```