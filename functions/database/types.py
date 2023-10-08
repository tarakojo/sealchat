import time 

class ChatHistoryEntry:
    def __init__(self, timestamp, attribute, message):
        self.timestamp = timestamp
        self.attribute = attribute
        self.message = message

    @staticmethod
    def from_dict(source):
        return ChatHistoryEntry(
            source['timestamp'],
            source['attribute'],
            source['message']
        )

    def to_dict(self):
        return {
            'timestamp': self.timestamp,
            'attribute': self.attribute,
            'message': self.message
        }

class CalendarEntry:
    def __init__(self, date, contents):
        self.date = date
        self.contents = contents

    @staticmethod
    def from_dict(source):
        return CalendarEntry(
            source['date'],
            source['contents']
        )

    def to_dict(self):
        return {
            'date': self.date,
            'contents': self.contents
        }

class AboutYou:
    def __init__(self, nickname, profile, secret_profile, recent_topics, last_update):
        self.nickname = nickname
        self.profile = profile
        self.secret_profile = secret_profile
        self.recent_topics = recent_topics
        self.last_update = last_update

    @staticmethod
    def empty():
        return AboutYou(
            nickname= "",
            profile= "",
            secret_profile= "",
            recent_topics= [],
            last_update= time.time()
        )

    @staticmethod
    def from_dict(source):
        return AboutYou(
            source['nickname'],
            source['profile'],
            source['secretProfile'],
            source['recentTopics'],
            source['lastUpdate']
        )

    def to_dict(self):
        return {
            'nickname': self.nickname,
            'profile': self.profile,
            'secretProfile': self.secret_profile,
            'recentTopics': self.recent_topics,
            'lastUpdate': self.last_update
        }
    
