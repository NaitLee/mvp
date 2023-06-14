for lang in zh-CN zh-TW zh-HK; do {
    echo $lang
    opencc -c $lang.json -i zh-Hant.json -o ../lang/$lang.json
}; done
