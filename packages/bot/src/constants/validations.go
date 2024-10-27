package constants

const MaxSize = 20 * 1024 * 1024
const MaxAttachments = 1
const EmptyMessage = ""

const ResponseEmptyMessage = "You are sending an empty message"
const ResponseInvalidFormat = "Please send a valid format, usage: ```image: <url>\ndescription: <description>```"
const ResponseEmptyFile = "Please send a file"
const ResponseInvalidFile = "Please send a valid file"
const ResponseMaxAttachments = "Please only send one file at a time"
const ResponseMaxSize = "Please send a file smaller than 20MB"
const ResponseValidOperation = "File saved successfully"
