UPDATE Profile
SET
    name = '<%= name %>'
WHERE @rid = $profileId[0]

LET $profileId = (
    SELECT profile.@rid
    FROM User
    WHERE @rid = <%= userId %>
)