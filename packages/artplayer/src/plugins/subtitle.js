function settingMix(art) {
    const {
        i18n,
        events: { proxy },
    } = art;

    return {
        title: 'Subtitle',
        name: 'subtitle',
        index: 20,
        html: `
            <div class="art-setting-header">
                ${i18n.get('Subtitle offset time')}: <span class="art-subtitle-value">0</span>s
            </div>
            <div class="art-setting-range">
                <input class="art-subtitle-range" value="0" type="range" min="-5" max="5" step="0.5">
            </div>
        `,
        mounted: $setting => {
            const $range = $setting.querySelector('.art-setting-range input');
            const $value = $setting.querySelector('.art-subtitle-value');
            proxy($range, 'change', () => {
                const { value } = $range;
                $value.innerText = value;
                art.plugins.subtitle.offset(Number(value));
            });

            art.on('subtitle:switch', () => {
                $range.value = 0;
                $value.innerText = 0;
            });

            art.on('artplayerPluginSubtitle:set', value => {
                if ($range.value !== value) {
                    $range.value = value;
                    $value.innerText = value;
                }
            });
        },
    };
}

export default function subtitle(art) {
    const { clamp } = art.constructor.utils;
    const { setting, notice, template, i18n, player } = art;
    
    i18n.update({
        'zh-cn': {
            'Subtitle offset time': '字幕偏移时间',
            'No subtitles found': '未发现字幕',
        },
        'zh-tw': {
            'Subtitle offset time': '字幕偏移時間',
            'No subtitles found': '未發現字幕',
        },
    });

    setting.add(settingMix);
    let cuesCache = [];
    art.on('subtitle:switch', () => {
        cuesCache = [];
    });

    return {
        name: 'subtitle',
        offset(value) {
            if (template.$track && template.$track.track) {
                const cues = Array.from(template.$track.track.cues);
                const time = clamp(value, -5, 5);
                cues.forEach((cue, index) => {
                    if (!cuesCache[index]) {
                        cuesCache[index] = {
                            startTime: cue.startTime,
                            endTime: cue.endTime,
                        };
                    }
                    cue.startTime = clamp(cuesCache[index].startTime + time, 0, player.duration);
                    cue.endTime = clamp(cuesCache[index].endTime + time, 0, player.duration);
                });
                notice.show(`${i18n.get('Subtitle offset time')}: ${value}s`);
                art.emit('artplayerPluginSubtitle:set', value);
            } else {
                notice.show(`${i18n.get('No subtitles found')}`);
                art.emit('artplayerPluginSubtitle:set', 0);
            }
        },
    };
}
