SELECT @this.name[0] AS name
FROM (
    SELECT $profile.name AS name
        LET $profile = (
            SELECT expand(profile)
            FROM User
            WHERE @rid = <%= userId %>
        )
)