UPDATE Profile
SET
    passwordHash = '<%= passwordHash %>'
WHERE @rid = $profileId[0]

LET $profileId = (
    SELECT profile.@rid
    FROM User
    WHERE @rid = <%= userId %>
)