class Course:
    def __init__(self, id, name, holes):
        self.id = id
        self.name = name
        self.holes = holes

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "holes": self.holes,
        }
