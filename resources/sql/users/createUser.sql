INSERT INTO USER
SET
    genericId = '<%= genericId %>',
    profile = (
        INSERT INTO Profile
        SET
            name = '<%= profile.name %>',
            passwordHash = '<%= profile.passwordHash %>',
            email = '<%= profile.email %>'
    )