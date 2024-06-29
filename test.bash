curl -X POST https://api.telegram.org/bot5000843321:AAHO_ULKvk5Sl-f3-a4AsNSX1cNFMm_H8pk/test/sendMessage \
-d '{
    "chat_id": "5000157372",
    "text": "Choose an option:",
    "reply_markup": {
        "inline_keyboard": [
            [
                {
                    "text": "Option 1",
                    "web_app": {
                        "url": "http://192.168.1.2:5173"
                    }
                }
              
            ]
        ]
    }
}' -H "Content-Type: application/json"