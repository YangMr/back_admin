import { Message } from "element-ui"
class Prompt {
    constructor() {
        
    };
    PromptMessage(message = "发生错误",type="error",duration=3000){
        Message({
            message,
            type,
            duration
        })
    }

}
export {Prompt} 