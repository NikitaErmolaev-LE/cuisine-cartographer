private function callOpenAiApi($prompt)
{
    $data = [
        'model' => 'gpt-4o', // используйте gpt-4o, если gpt-4o-mini не поддерживается
        'messages' => [
            [
                'role' => 'system',
                'content' => 'You are a helpful culinary assistant specialized in European cuisine.'
            ],
            [
                'role' => 'user',
                'content' => $prompt
            ]
        ],
        'temperature' => 0.7
    ];

    $ch = curl_init($this->apiEndpoint);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, Json::encode($data));
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json',
        'Authorization: Bearer ' . $this->apiKey
    ]);
    curl_setopt($ch, CURLOPT_TIMEOUT, 30); // Таймаут запроса
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true); // Убедимся, что используем HTTPS

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $curlError = curl_error($ch);
    curl_close($ch);

    if ($httpCode !== 200) {
        Yii::error("OpenAI API error: HTTP $httpCode - Response: " . $response . " - cURL Error: " . $curlError);
        return false;
    }

    $decodedResponse = Json::decode($response, true);

    // Проверяем, содержит ли ответ нужные ключи
    if (!isset($decodedResponse['choices'][0]['message']['content'])) {
        Yii::error("OpenAI API error: Unexpected response format: " . $response);
        return false;
    }

    return $decodedResponse;
}
