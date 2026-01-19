// 캐릭터 데이터
const CHARACTERS = {
    perfectionist: {
        id: 'perfectionist',
        name: '완벽주의 센서티브',
        fullName: '서윤아',
        icon: '💎',
        image: 'images/character1-perfectionist-normal.jpg',
        age: 27,
        job: '패션 디자이너',
        quote: '"완벽하지 않으면 의미 없어요"',
        birthday: { month: 3, day: 14 },  // 3월 14일 (화이트데이)
        difficulty: 5,
        difficultyMultiplier: 0.3,  // 매우 어려움 - 호감도/신뢰도 상승 30%만 적용
        startAffection: 5,  // 극도로 낮은 시작점 (10 → 5)
        startTrust: 3,  // 극도로 낮은 시작점 (5 → 3)
        preferences: {
            // 데이트 선호도 (곱수)
            dates: {
                walk: 0.5,
                cafe: 0.8,
                drive: 1.2,
                dining: 1.5
            },
            // 선물 선호도
            gifts: {
                cake: 0.7,
                flower: 0.9,
                perfume: 1.3,
                bag: 1.5,
                ring: 1.2
            },
            // 대화 선호도
            talks: {
                daily: 0.8,
                comfort: 1.1,
                future: 1.3,
                humor: 0.6
            }
        },
        traits: {
            highCostBonus: 1.5,      // 고비용 데이트 보너스
            lowCostPenalty: 0.5,     // 저비용 데이트 페널티
            mistakePenalty: 2.0      // 실수 시 페널티 2배
        },
        talkTypePreferences: {
            // 긍정적: 정중하고 배려 있는 대화 선호
            'listen': 1.3, 'help': 1.4, 'caring': 1.5, 'respectful': 1.5, 'supportive': 1.4,
            'romantic': 1.3, 'appreciative': 1.3, 'encouraging': 1.3,
            // 매우 싫어함: 무례하고 경솔한 태도
            'dismissive': 0.3, 'sarcastic': 0.2, 'rude': 0.2, 'criticizing': 0.3,
            'judgmental': 0.2, 'cynical': 0.2, 'distracted': 0.3, 'uninterested': 0.3
        }
    },
    positive: {
        id: 'positive',
        name: '비타민 긍정녀',
        fullName: '강하영',
        icon: '☀️',
        image: 'images/character2-positive-normal.jpg',
        age: 25,
        job: '초등학교 교사',
        quote: '"오늘도 화이팅! 우리 행복하자!"',
        birthday: { month: 5, day: 5 },  // 5월 5일 (어린이날)
        difficulty: 2,
        difficultyMultiplier: 0.9,  // 쉬움 - 기본 효과의 90%
        startAffection: 12,  // 2배 이하로 감소 (25 → 12)
        startTrust: 7,  // 2배 이하로 감소 (15 → 7)
        preferences: {
            dates: {
                walk: 1.5,
                cafe: 1.2,
                drive: 1.1,
                dining: 0.9
            },
            gifts: {
                cake: 1.4,
                flower: 1.3,
                perfume: 1.0,
                bag: 0.8,
                ring: 1.1
            },
            talks: {
                daily: 1.3,
                comfort: 1.4,
                future: 1.1,
                humor: 1.5
            }
        },
        traits: {
            lowCostBonus: 1.3,       // 저비용 데이트 효율 좋음
            neglectPenalty: 5,       // 3일 이상 방치 시 매일 -5
            forgivingNature: true    // 실수에 관대
        },
        talkTypePreferences: {
            // 긍정적: 재미있고 활기찬 대화 선호
            'enthusiastic': 1.5, 'playful': 1.5, 'engaging': 1.4, 'bonding': 1.5,
            'inclusive': 1.4, 'participating': 1.4, 'encouraging': 1.5, 'active': 1.4,
            'appreciative': 1.3, 'interested': 1.3, 'curious': 1.3,
            // 약간 싫어함: 부정적 태도 (하지만 관대함)
            'dismissive': 0.6, 'rude': 0.6, 'cynical': 0.6, 'judgmental': 0.6,
            'criticizing': 0.7, 'sarcastic': 0.7
        }
    },
    tsundere: {
        id: 'tsundere',
        name: '반전 매력의 츤데레',
        fullName: '이지우',
        icon: '🌸',
        image: 'images/character3-tsundere-normal.jpg',
        age: 24,
        job: '웹툰 작가',
        quote: '"별로... 안 좋은데... (좋아)"',
        birthday: { month: 11, day: 11 },  // 11월 11일 (빼빼로데이)
        difficulty: 3,
        difficultyMultiplier: 0.65,  // 보통 - 호감도/신뢰도 상승 65%만 적용
        startAffection: 10,  // 2배 이하로 감소 (20 → 10)
        startTrust: 5,  // 2배 이하로 감소 (10 → 5)
        preferences: {
            dates: {
                walk: 1.1,
                cafe: 1.3,
                drive: 1.0,
                dining: 1.1
            },
            gifts: {
                cake: 1.2,
                flower: 1.4,
                perfume: 1.1,
                bag: 0.9,
                ring: 1.3
            },
            talks: {
                daily: 1.2,
                comfort: 1.3,
                future: 0.9,
                humor: 1.1
            }
        },
        traits: {
            delayedEffect: true,     // 효과가 다음 날 반영
            stableScore: true,       // 점수 변동 적음
            tsundereBonus: 1.2       // 특정 상황에서 보너스
        },
        talkTypePreferences: {
            // 선호: 장난스럽고 은근한 대화 (직접적 로맨틱은 부끄러워함)
            'playful': 1.4, 'teasing': 1.5, 'balanced': 1.4, 'sharing': 1.3,
            'curious': 1.3, 'interested': 1.3, 'deflecting': 1.2,
            // 부끄러워함: 너무 직접적인 로맨틱 (하지만 싫어하지는 않음)
            'romantic': 0.9, 'direct_romantic': 0.8, 'generous': 0.85,
            // 싫어함: 무례하고 공격적인 태도
            'rude': 0.4, 'sarcastic': 0.4, 'dismissive': 0.5, 'judgmental': 0.5
        }
    },
    career: {
        id: 'career',
        name: '논리적인 커리어우먼',
        fullName: '최서연',
        icon: '💼',
        image: 'images/character4-career-normal.jpg',
        age: 29,
        job: '변호사',
        quote: '"논리적으로 설명해 보세요"',
        birthday: { month: 12, day: 25 },  // 12월 25일 (크리스마스)
        difficulty: 4,
        difficultyMultiplier: 0.45,  // 어려움 - 호감도/신뢰도 상승 45%만 적용
        startAffection: 7,  // 2배 이하로 감소 (15 → 7)
        startTrust: 4,  // 2배 이하로 감소 (8 → 4)
        preferences: {
            dates: {
                walk: 0.9,
                cafe: 1.1,
                drive: 1.0,
                dining: 1.3
            },
            gifts: {
                cake: 0.8,
                flower: 0.9,
                perfume: 1.2,
                bag: 1.1,
                ring: 1.2
            },
            talks: {
                daily: 1.0,
                comfort: 1.1,
                future: 1.5,
                humor: 0.8
            }
        },
        traits: {
            talkBonus: 1.5,          // 대화 효과 1.5배
            logicRequired: true,     // 논리적 대화 선호
            mistakePenalty: 1.5      // 비논리적 대화 시 페널티
        },
        talkTypePreferences: {
            // 매우 선호: 논리적이고 직접적인 대화
            'logical': 1.6, 'direct': 1.5, 'honest': 1.6, 'promise': 1.5,
            'balanced': 1.4, 'explain': 1.4, 'ask': 1.4, 'honest_negative': 1.5,
            'critical_constructive': 1.5, 'realistic': 1.4,
            // 중립: 감정적이지만 논리적인 접근
            'supportive': 1.0, 'caring': 1.0, 'respectful': 1.1,
            // 싫어함: 지나치게 감정적이거나 논리 없는 태도
            'romantic': 0.7, 'overly_emotional': 0.6, 'quick_reassure': 0.5,
            'dismissive': 0.4, 'deflecting': 0.5, 'excuse': 0.6
        }
    }
};

// 데이트 장소 데이터
const DATE_LOCATIONS = {
    walk: {
        id: 'walk',
        name: '동네 산책',
        icon: '🚶',
        cost: 0,
        stamina: 35,
        baseAffection: 4,
        baseTrust: 3,
        description: '소소한 대화를 나누며 동네를 걷습니다',
        scenarios: [
            {
                id: 'walk_sunset',
                situation: '해가 지는 것을 보며 산책하고 있습니다.',
                choices: [
                    { text: '"노을이 정말 예쁘네요. 당신처럼요."', affection: 6, trust: 3, type: 'romantic' },
                    { text: '조용히 손을 잡는다', affection: 5, trust: 7, type: 'skinship' },
                    { text: '"배고프지 않아요? 뭐 먹으러 갈까요?"', affection: 3, trust: 5, type: 'caring' },
                    { text: '휴대폰으로 사진만 찍느라 정신없다', affection: -5, trust: -8, type: 'distracted' }
                ]
            },
            {
                id: 'walk_dog',
                situation: '귀여운 강아지가 다가옵니다.',
                choices: [
                    { text: '함께 강아지를 쓰다듬는다', affection: 7, trust: 8, type: 'cute' },
                    { text: '"강아지 키우고 싶지 않아요?"', affection: 6, trust: 12, type: 'future' },
                    { text: '강아지를 피해 다른 길로 간다', affection: 3, trust: 5, type: 'neutral' },
                    { text: '"더러워요" 강아지를 밀어낸다', affection: -10, trust: -12, type: 'rude' }
                ]
            },
            {
                id: 'walk_bench',
                situation: '공원 벤치에 앉아 쉬고 있습니다. 주변이 조용하고 평화롭습니다.',
                choices: [
                    { text: '어깨에 기대도록 슬며시 다가간다', affection: 9, trust: 8, type: 'romantic' },
                    { text: '"어떤 생각하고 있어요?"라고 물어본다', affection: 6, trust: 12, type: 'caring' },
                    { text: '조용히 함께 경치를 바라본다', affection: 4, trust: 10, type: 'calm' },
                    { text: '계속 하품하며 지루해한다', affection: -8, trust: -10, type: 'bored' }
                ]
            },
            {
                id: 'walk_rain',
                situation: '갑자기 비가 내리기 시작합니다.',
                choices: [
                    { text: '재킷을 벗어 씌워주며 뛰어간다', affection: 10, trust: 10, type: 'gentleman' },
                    { text: '편의점으로 달려가 우산을 산다', affection: 7, trust: 8, type: 'practical' },
                    { text: '"비 맞으면서 걸어볼까요?"라고 웃으며 말한다', affection: 9, trust: 5, type: 'romantic' },
                    { text: '"왜 우산 안 챙겼어요?" 짜증낸다', affection: -12, trust: -15, type: 'blaming' }
                ]
            },
            {
                id: 'walk_ice_cream',
                situation: '아이스크림 트럭이 지나갑니다.',
                choices: [
                    { text: '"아이스크림 먹고 싶으세요?" 사주겠다고 한다', affection: 8, trust: 8, type: 'treat' },
                    { text: '같이 고르며 "어떤 맛 좋아해요?"', affection: 7, trust: 10, type: 'interest' },
                    { text: '그냥 지나친다', affection: 2, trust: 5, type: 'pass' },
                    { text: '"살 찌는데 안 먹는 게 좋을걸요"', affection: -15, trust: -12, type: 'body_shaming' }
                ]
            },
            {
                id: 'walk_street_music',
                situation: '거리 공연을 하는 뮤지션이 연주 중입니다.',
                choices: [
                    { text: '함께 멈춰 서서 음악을 감상한다', affection: 8, trust: 10, type: 'appreciate' },
                    { text: '"춤출까요?" 장난스럽게 제안한다', affection: 10, trust: 8, type: 'playful' },
                    { text: '팁을 주며 "좋은 음악이네요"', affection: 9, trust: 12, type: 'generous' },
                    { text: '"시끄럽네요" 빨리 지나가자고 한다', affection: -8, trust: -10, type: 'complaining' }
                ]
            },
            {
                id: 'walk_flower_shop',
                situation: '예쁜 꽃가게 앞을 지나갑니다.',
                choices: [
                    { text: '꽃 한 송이를 사서 선물한다', affection: 12, trust: 10, type: 'romantic' },
                    { text: '"어떤 꽃 좋아하세요?" 관심을 보인다', affection: 7, trust: 12, type: 'curious' },
                    { text: '잠깐 같이 들어가서 구경한다', affection: 6, trust: 8, type: 'browse' },
                    { text: '"꽃은 금방 시들잖아요" 무시한다', affection: -10, trust: -8, type: 'cynical' }
                ]
            },
            {
                id: 'walk_tired',
                situation: '상대방이 피곤해 보입니다. 걸음이 느려집니다.',
                choices: [
                    { text: '"피곤하세요? 잠깐 쉴까요?"', affection: 10, trust: 12, type: 'caring' },
                    { text: '팔짱을 끼며 지지해준다', affection: 12, trust: 10, type: 'supportive' },
                    { text: '"집 가까우니까 조금만 더 가요"', affection: 4, trust: 6, type: 'encouraging' },
                    { text: '"왜 이렇게 체력이 없어요?" 핀잔준다', affection: -15, trust: -18, type: 'insensitive' }
                ]
            },
            {
                id: 'walk_old_couple',
                situation: '손을 잡고 걷는 노부부를 봅니다.',
                choices: [
                    { text: '"우리도 저렇게 될 수 있을까요?"', affection: 12, trust: 15, type: 'hopeful' },
                    { text: '조용히 손을 잡는다', affection: 10, trust: 12, type: 'romantic' },
                    { text: '"멋지네요" 미소 짓는다', affection: 6, trust: 8, type: 'appreciative' },
                    { text: '아무 말 없이 그냥 지나친다', affection: -3, trust: -5, type: 'indifferent' }
                ]
            },
            {
                id: 'walk_cat',
                situation: '담벼락 위에 고양이가 앉아 있습니다.',
                choices: [
                    { text: '"고양이다!" 같이 관심을 가진다', affection: 8, trust: 10, type: 'interested' },
                    { text: '조심스럽게 다가가 쓰다듬으려 한다', affection: 9, trust: 8, type: 'gentle' },
                    { text: '사진을 찍어준다', affection: 7, trust: 8, type: 'photographer' },
                    { text: '"저 고양이 불쌍해 보이는데요" 부정적으로 말한다', affection: -6, trust: -8, type: 'negative' }
                ]
            }
        ]
    },
    cafe: {
        id: 'cafe',
        name: '영화관 & 카페',
        icon: '☕',
        cost: 75000,
        stamina: 30,
        baseAffection: 6,
        baseTrust: 5,
        description: '영화를 보고 카페에서 담소를 나눕니다',
        scenarios: [
            {
                id: 'cafe_boring',
                situation: '영화가 생각보다 지루합니다.',
                choices: [
                    { text: '"좀 지루하다, 나갈까요?"', affection: -5, trust: 10, type: 'honest' },
                    { text: '끝까지 집중해서 본다', affection: 4, trust: 15, type: 'manner' },
                    { text: '귓속말로 농담을 건넨다', affection: 7, trust: 8, type: 'playful' },
                    { text: '계속 하품하고 휴대폰을 본다', affection: -12, trust: -15, type: 'rude' }
                ]
            },
            {
                id: 'cafe_drink',
                situation: '카페에서 무엇을 마실지 고민합니다.',
                choices: [
                    { text: '"뭐 마실래요? 제가 살게요"', affection: 7, trust: 10, type: 'gentleman' },
                    { text: '"커플 세트 시킬까요?"', affection: 9, trust: 8, type: 'romantic' },
                    { text: '각자 주문한다', affection: 4, trust: 12, type: 'independent' },
                    { text: '"제일 싼 거 시키세요" 인색하게 말한다', affection: -15, trust: -12, type: 'cheap' }
                ]
            },
            {
                id: 'cafe_photo',
                situation: '카페 인테리어가 예쁩니다. 상대방이 사진 찍을까 말까 망설입니다.',
                choices: [
                    { text: '"제가 사진 찍어드릴게요!" 먼저 제안한다', affection: 9, trust: 10, type: 'caring' },
                    { text: '"같이 찍어요" 셀카를 찍자고 한다', affection: 10, trust: 8, type: 'romantic' },
                    { text: '조용히 분위기를 즐긴다', affection: 4, trust: 12, type: 'calm' },
                    { text: '"또요? 맨날 사진만 찍네"', affection: -10, trust: -10, type: 'annoyed' }
                ]
            },
            {
                id: 'cafe_dessert',
                situation: '맛있어 보이는 디저트가 많습니다.',
                choices: [
                    { text: '"같이 나눠 먹어요" 여러 개 시킨다', affection: 9, trust: 12, type: 'sharing' },
                    { text: '상대방이 좋아할 만한 것을 골라준다', affection: 10, trust: 10, type: 'attentive' },
                    { text: '각자 먹고 싶은 것을 시킨다', affection: 6, trust: 10, type: 'respect' },
                    { text: '"배부른데 굳이?" 주문을 거부한다', affection: -8, trust: -8, type: 'refusing' }
                ]
            },
            {
                id: 'cafe_movie_scary',
                situation: '영화에서 무서운 장면이 나옵니다.',
                choices: [
                    { text: '손을 꼭 잡아준다', affection: 12, trust: 10, type: 'protective' },
                    { text: '"괜찮아요?" 귓속말로 물어본다', affection: 9, trust: 12, type: 'caring' },
                    { text: '같이 놀라며 분위기를 즐긴다', affection: 8, trust: 8, type: 'fun' },
                    { text: '"뭐가 무서워요?" 비웃는다', affection: -12, trust: -15, type: 'mocking' }
                ]
            },
            {
                id: 'cafe_movie_sad',
                situation: '영화가 감동적입니다. 상대방이 눈물을 글썽입니다.',
                choices: [
                    { text: '조용히 휴지를 건넨다', affection: 10, trust: 12, type: 'gentle' },
                    { text: '손을 잡아주며 위로한다', affection: 12, trust: 10, type: 'comforting' },
                    { text: '같이 감동받으며 본다', affection: 9, trust: 10, type: 'empathy' },
                    { text: '"별로 슬프지 않은데요" 공감 없이 말한다', affection: -15, trust: -18, type: 'cold' }
                ]
            },
            {
                id: 'cafe_popcorn',
                situation: '팝콘을 살지 말지 고민 중입니다.',
                choices: [
                    { text: '"제가 살게요, 같이 먹어요"', affection: 8, trust: 10, type: 'sharing' },
                    { text: '"커플 콤보 시킬까요?"', affection: 10, trust: 8, type: 'couple' },
                    { text: '"필요 없어요" 안 산다', affection: 3, trust: 5, type: 'skip' },
                    { text: '"돈 아깝잖아요" 인색하게 말한다', affection: -12, trust: -10, type: 'stingy' }
                ]
            },
            {
                id: 'cafe_cold',
                situation: '카페에 에어컨이 너무 강합니다. 상대방이 춥다고 합니다.',
                choices: [
                    { text: '재킷을 벗어서 씌워준다', affection: 12, trust: 12, type: 'gentleman' },
                    { text: '자리를 옮기자고 제안한다', affection: 8, trust: 10, type: 'practical' },
                    { text: '따뜻한 음료를 추가로 시킨다', affection: 9, trust: 10, type: 'caring' },
                    { text: '"저는 안 춥은데요" 무시한다', affection: -10, trust: -12, type: 'dismissive' }
                ]
            },
            {
                id: 'cafe_menu_hard',
                situation: '메뉴를 고르기 어려워합니다.',
                choices: [
                    { text: '"제가 자주 먹는 건데, 추천해도 될까요?"', affection: 9, trust: 12, type: 'helpful' },
                    { text: '"천천히 골라요, 제가 기다릴게요"', affection: 8, trust: 10, type: 'patient' },
                    { text: '직원에게 추천 메뉴를 물어본다', affection: 7, trust: 10, type: 'proactive' },
                    { text: '"빨리 결정해요, 시간 없어요"', affection: -12, trust: -15, type: 'impatient' }
                ]
            },
            {
                id: 'cafe_spill',
                situation: '실수로 음료를 조금 흘렸습니다.',
                choices: [
                    { text: '"괜찮아요" 웃으며 휴지로 닦아준다', affection: 10, trust: 12, type: 'kind' },
                    { text: '직원을 불러 도움을 요청한다', affection: 7, trust: 10, type: 'practical' },
                    { text: '같이 웃으며 정리한다', affection: 9, trust: 10, type: 'lighthearted' },
                    { text: '"조심하지 그랬어요" 짜증을 낸다', affection: -15, trust: -18, type: 'angry' }
                ]
            }
        ]
    },
    drive: {
        id: 'drive',
        name: '근교 드라이브',
        icon: '🚗',
        cost: 200000,
        stamina: 30,
        baseAffection: 8,
        baseTrust: 6,
        description: '차를 렌트해 근교로 드라이브를 갑니다',
        scenarios: [
            {
                id: 'drive_music',
                situation: '차 안에서 음악을 틀까 말까 고민됩니다.',
                choices: [
                    { text: '"어떤 노래 좋아해요?"', affection: 9, trust: 12, type: 'interest' },
                    { text: '조용히 운전에 집중한다', affection: 6, trust: 15, type: 'safe' },
                    { text: '내가 좋아하는 노래를 튼다', affection: 7, trust: 8, type: 'share' },
                    { text: '시끄러운 음악을 크게 틀어 불편하게 만든다', affection: -10, trust: -12, type: 'inconsiderate' }
                ]
            },
            {
                id: 'drive_view',
                situation: '멋진 뷰 포인트를 발견했습니다.',
                choices: [
                    { text: '차를 세우고 함께 경치를 본다', affection: 12, trust: 15, type: 'romantic' },
                    { text: '"사진 찍어드릴까요?"', affection: 10, trust: 12, type: 'caring' },
                    { text: '그냥 지나간다', affection: 3, trust: 8, type: 'skip' },
                    { text: '"시간 없는데요" 무시하고 지나친다', affection: -8, trust: -10, type: 'dismissive' }
                ]
            },
            {
                id: 'drive_tired',
                situation: '장거리 운전으로 피곤해 보입니다.',
                choices: [
                    { text: '"제가 운전할게요" 교대를 제안한다', affection: 12, trust: 18, type: 'caring' },
                    { text: '휴게소에 들러 쉬자고 한다', affection: 9, trust: 15, type: 'considerate' },
                    { text: '재미있는 이야기로 졸음을 쫓아준다', affection: 10, trust: 12, type: 'entertaining' },
                    { text: '"조금만 더 가요" 계속 재촉한다', affection: -12, trust: -15, type: 'pushy' }
                ]
            },
            {
                id: 'drive_surprise',
                situation: '미리 준비한 깜짝 장소에 도착했습니다.',
                choices: [
                    { text: '"여기 오고 싶다고 했잖아요" 말한다', affection: 15, trust: 20, type: 'attentive' },
                    { text: '놀란 표정을 보며 즐거워한다', affection: 13, trust: 15, type: 'happy' },
                    { text: '"사실 준비했어요" 수줍게 말한다', affection: 12, trust: 18, type: 'shy' },
                    { text: '"별로 안 좋은데요"', affection: -18, trust: -20, type: 'ungrateful' }
                ]
            },
            {
                id: 'drive_traffic',
                situation: '막히는 도로에 갇혔습니다. 예상보다 오래 걸립니다.',
                choices: [
                    { text: '"괜찮아요, 당신과 함께니까"', affection: 12, trust: 15, type: 'romantic' },
                    { text: '게임이나 퀴즈로 시간을 때운다', affection: 10, trust: 12, type: 'entertaining' },
                    { text: '다른 길을 찾아본다', affection: 8, trust: 15, type: 'problem_solving' },
                    { text: '계속 짜증내며 불평한다', affection: -15, trust: -18, type: 'complaining' }
                ]
            },
            {
                id: 'drive_speed',
                situation: '속도를 내고 싶지만 상대방이 무서워합니다.',
                choices: [
                    { text: '속도를 줄이고 안전하게 운전한다', affection: 10, trust: 18, type: 'considerate' },
                    { text: '"안전하게 갈게요" 안심시킨다', affection: 9, trust: 20, type: 'reassuring' },
                    { text: '"재미있잖아요" 계속 빠르게 운전한다', affection: -15, trust: -25, type: 'reckless' },
                    { text: '"겁쟁이네요" 무시한다', affection: -20, trust: -22, type: 'mocking' }
                ]
            },
            {
                id: 'drive_food',
                situation: '휴게소에 들렀습니다. 간식을 사자고 합니다.',
                choices: [
                    { text: '"뭐 먹고 싶어요? 제가 살게요"', affection: 10, trust: 12, type: 'treating' },
                    { text: '같이 이것저것 고른다', affection: 9, trust: 10, type: 'together' },
                    { text: '추천 메뉴를 골라준다', affection: 8, trust: 10, type: 'suggest' },
                    { text: '"빨리 사요, 늦었어요"', affection: -10, trust: -12, type: 'rushing' }
                ]
            },
            {
                id: 'drive_lost',
                situation: '길을 잃은 것 같습니다.',
                choices: [
                    { text: '"괜찮아요, 같이 찾아봐요"', affection: 10, trust: 15, type: 'supportive' },
                    { text: '네비게이션을 다시 설정한다', affection: 8, trust: 18, type: 'practical' },
                    { text: '"모험 같아서 재밌는데요?" 긍정적으로 말한다', affection: 12, trust: 10, type: 'positive' },
                    { text: '"왜 미리 안 확인했어요?" 비난한다', affection: -15, trust: -20, type: 'blaming' }
                ]
            },
            {
                id: 'drive_sunset_view',
                situation: '바다가 보이는 도로를 달립니다. 석양이 아름답습니다.',
                choices: [
                    { text: '차를 세우고 함께 감상한다', affection: 15, trust: 18, type: 'romantic' },
                    { text: '"사진 찍어드릴게요"', affection: 12, trust: 15, type: 'caring' },
                    { text: '창문을 열고 바람을 쐰다', affection: 10, trust: 12, type: 'enjoying' },
                    { text: '그냥 지나치며 "별로네요"', affection: -10, trust: -12, type: 'unappreciative' }
                ]
            },
            {
                id: 'drive_cold_ac',
                situation: '에어컨이 너무 셉니다. 상대방이 춥다고 합니다.',
                choices: [
                    { text: '바로 에어컨을 약하게 조절한다', affection: 10, trust: 15, type: 'responsive' },
                    { text: '재킷을 씌워준다', affection: 12, trust: 12, type: 'caring' },
                    { text: '"조금만 참아요"', affection: 3, trust: 5, type: 'asking' },
                    { text: '"저는 더운데요" 무시한다', affection: -12, trust: -15, type: 'selfish' }
                ]
            }
        ]
    },
    dining: {
        id: 'dining',
        name: '호텔 다이닝',
        icon: '🍽️',
        cost: 450000,
        stamina: 30,
        baseAffection: 12,
        baseTrust: 8,
        description: '고급 호텔 레스토랑에서 파인 다이닝을 즐깁니다',
        scenarios: [
            {
                id: 'dining_wine',
                situation: '소믈리에가 와인을 추천합니다.',
                choices: [
                    { text: '소믈리에의 추천을 따른다', affection: 15, trust: 18, type: 'trust' },
                    { text: '"당신이 좋아하는 걸로 골라요"', affection: 16, trust: 15, type: 'caring' },
                    { text: '내가 와인을 직접 고른다', affection: 12, trust: 12, type: 'confident' },
                    { text: '"와인은 필요 없어요" 거절한다', affection: -10, trust: -12, type: 'refuse' }
                ]
            },
            {
                id: 'dining_manner',
                situation: '테이블 매너가 어렵습니다.',
                choices: [
                    { text: '자연스럽게 매너를 지킨다', affection: 18, trust: 25, type: 'perfect' },
                    { text: '"매너가 어렵네요" 솔직하게 말한다', affection: 13, trust: 20, type: 'honest' },
                    { text: '상대방의 행동을 따라한다', affection: 15, trust: 18, type: 'adaptive' },
                    { text: '매너를 전혀 지키지 않고 시끄럽게 먹는다', affection: -20, trust: -25, type: 'rude' }
                ]
            },
            {
                id: 'dining_proposal',
                situation: '분위기가 너무 좋습니다. 주변 사람들이 둘을 바라봅니다.',
                choices: [
                    { text: '"정말 행복해요" 진심을 전한다', affection: 19, trust: 25, type: 'sincere' },
                    { text: '손을 잡고 눈을 마주본다', affection: 21, trust: 22, type: 'romantic' },
                    { text: '"자주 이렇게 나왔으면 좋겠어요"', affection: 16, trust: 20, type: 'hopeful' },
                    { text: '계속 휴대폰만 본다', affection: -18, trust: -22, type: 'distracted' }
                ]
            },
            {
                id: 'dining_course',
                situation: '메인 요리가 나왔습니다. 정말 맛있어 보입니다.',
                choices: [
                    { text: '"한 입 맛볼래요?" 나눠 먹자고 한다', affection: 18, trust: 20, type: 'sharing' },
                    { text: '먼저 상대방의 반응을 살핀다', affection: 15, trust: 22, type: 'considerate' },
                    { text: '"정말 맛있어요!" 즐거워한다', affection: 16, trust: 18, type: 'happy' },
                    { text: '"별로네요, 이 가격에 이것밖에?" 불평한다', affection: -20, trust: -18, type: 'complaining' }
                ]
            },
            {
                id: 'dining_appetizer',
                situation: '에피타이저가 나왔습니다. 생소한 요리입니다.',
                choices: [
                    { text: '"신기한데요? 같이 먹어봐요"', affection: 16, trust: 18, type: 'adventurous' },
                    { text: '먼저 맛보고 상대방에게 설명해준다', affection: 17, trust: 20, type: 'guide' },
                    { text: '웨이터에게 요리에 대해 물어본다', affection: 15, trust: 18, type: 'curious' },
                    { text: '"이상한 음식이네요" 거부감을 드러낸다', affection: -12, trust: -15, type: 'dismissive' }
                ]
            },
            {
                id: 'dining_dress',
                situation: '"오늘 정말 멋지네요"라고 칭찬합니다.',
                choices: [
                    { text: '"당신도 정말 아름다워요"', affection: 18, trust: 20, type: 'compliment_back' },
                    { text: '"당신 때문에 신경 많이 썼어요"', affection: 20, trust: 22, type: 'sincere' },
                    { text: '부끄러워하며 "감사합니다"', affection: 15, trust: 18, type: 'shy' },
                    { text: '"별로 안 꾸몄는데요" 무뚝뚝하게 답한다', affection: -10, trust: -12, type: 'cold' }
                ]
            },
            {
                id: 'dining_expensive',
                situation: '계산서를 받았습니다. 예상보다 비쌉니다.',
                choices: [
                    { text: '태연하게 카드를 낸다', affection: 20, trust: 25, type: 'confident' },
                    { text: '"좋은 시간이었으니 괜찮아요"', affection: 18, trust: 22, type: 'positive' },
                    { text: '"더치페이 할래요?" 제안한다', affection: 8, trust: 15, type: 'split' },
                    { text: '"너무 비싸네요" 얼굴을 찌푸린다', affection: -18, trust: -20, type: 'cheap' }
                ]
            },
            {
                id: 'dining_music',
                situation: '라이브 연주가 시작됩니다. 분위기가 좋습니다.',
                choices: [
                    { text: '"춤출까요?" 손을 내민다', affection: 22, trust: 20, type: 'romantic' },
                    { text: '조용히 음악을 감상하며 손을 잡는다', affection: 20, trust: 22, type: 'intimate' },
                    { text: '"좋은 음악이네요"라고 말한다', affection: 16, trust: 18, type: 'appreciate' },
                    { text: '음악에 관심 없이 휴대폰을 본다', affection: -15, trust: -20, type: 'rude' }
                ]
            },
            {
                id: 'dining_staff',
                situation: '웨이터가 실수로 물을 쏟았습니다.',
                choices: [
                    { text: '"괜찮아요" 웃으며 이해한다', affection: 18, trust: 25, type: 'understanding' },
                    { text: '상대방의 옷을 먼저 확인하고 닦아준다', affection: 20, trust: 22, type: 'caring' },
                    { text: '침착하게 직원을 도와 정리한다', affection: 17, trust: 23, type: 'helpful' },
                    { text: '화를 내며 직원을 비난한다', affection: -22, trust: -28, type: 'angry' }
                ]
            },
            {
                id: 'dining_view',
                situation: '창밖 야경이 아름답습니다.',
                choices: [
                    { text: '"경치도 아름답지만 당신이 더 아름다워요"', affection: 22, trust: 20, type: 'romantic' },
                    { text: '사진을 찍어준다', affection: 18, trust: 18, type: 'photographer' },
                    { text: '같이 감상하며 손을 잡는다', affection: 20, trust: 20, type: 'together' },
                    { text: '"별로 안 예쁜데요" 시큰둥하다', affection: -12, trust: -15, type: 'unimpressed' }
                ]
            }
        ]
    },
    amusement_park: {
        id: 'amusement_park',
        name: '놀이공원',
        icon: '🎡',
        cost: 120000,
        stamina: 45,
        baseAffection: 10,
        baseTrust: 7,
        description: '스릴 넘치는 놀이기구와 즐거운 시간',
        scenarios: [
            {
                id: 'park_rollercoaster',
                situation: '무서운 롤러코스터 앞입니다. 상대방이 망설입니다.',
                choices: [
                    { text: '"제가 꼭 잡아줄게요" 용기를 준다', affection: 15, trust: 18, type: 'reassuring' },
                    { text: '"안 타도 돼요. 다른 거 탈까요?"', affection: 12, trust: 20, type: 'considerate' },
                    { text: '"같이 타요! 재밌을 거예요" 설득한다', affection: 14, trust: 15, type: 'encouraging' },
                    { text: '"겁쟁이네요" 놀린다', affection: -15, trust: -18, type: 'mocking' }
                ]
            },
            {
                id: 'park_prize',
                situation: '경품 뽑기 게임이 있습니다. 인형을 따달라고 합니다.',
                choices: [
                    { text: '끝까지 도전해서 인형을 딴다', affection: 20, trust: 18, type: 'determined' },
                    { text: '몇 번 시도하다 "옆에서 사는 게 나을 것 같아요"', affection: 10, trust: 15, type: 'practical' },
                    { text: '"저 잘 못해요" 처음부터 거절한다', affection: -10, trust: -12, type: 'refuse' },
                    { text: '계속 실패하지만 웃으며 즐긴다', affection: 12, trust: 16, type: 'fun' }
                ]
            },
            {
                id: 'park_haunted',
                situation: '귀신의 집에 들어갔습니다. 상대방이 무서워합니다.',
                choices: [
                    { text: '손을 꼭 잡고 보호한다', affection: 18, trust: 20, type: 'protective' },
                    { text: '재밌어하며 귀신을 따라한다', affection: 10, trust: 8, type: 'playful' },
                    { text: '"괜찮아요. 다 가짜예요"', affection: 14, trust: 16, type: 'reassuring' },
                    { text: '본인도 겁먹어서 같이 비명지른다', affection: 15, trust: 12, type: 'honest' }
                ]
            },
            {
                id: 'park_ferris_wheel',
                situation: '관람차에서 아름다운 야경을 봅니다.',
                choices: [
                    { text: '손을 잡고 경치를 감상한다', affection: 18, trust: 18, type: 'romantic' },
                    { text: '"오늘 정말 즐거웠어요"', affection: 16, trust: 20, type: 'happy' },
                    { text: '사진을 찍자고 한다', affection: 14, trust: 14, type: 'memory' },
                    { text: '휴대폰만 본다', affection: -15, trust: -18, type: 'rude' }
                ]
            },
            {
                id: 'park_food',
                situation: '맛있어 보이는 간식들이 많습니다.',
                choices: [
                    { text: '"뭐 먹고 싶어요? 제가 살게요"', affection: 14, trust: 16, type: 'treat' },
                    { text: '여러 가지를 사서 나눠 먹는다', affection: 16, trust: 18, type: 'sharing' },
                    { text: '"배불러서 괜찮아요"', affection: 8, trust: 10, type: 'skip' },
                    { text: '"돈 아까운데 집에 가서 먹어요"', affection: -12, trust: -15, type: 'cheap' }
                ]
            },
            {
                id: 'park_parade',
                situation: '화려한 퍼레이드가 시작됩니다.',
                choices: [
                    { text: '같이 신나게 즐긴다', affection: 16, trust: 14, type: 'fun' },
                    { text: '뒤에서 꼭 안아준다', affection: 18, trust: 16, type: 'romantic' },
                    { text: '영상을 찍어준다', affection: 14, trust: 14, type: 'photographer' },
                    { text: '"유치하네요" 시큰둥하다', affection: -15, trust: -16, type: 'dismissive' }
                ]
            },
            {
                id: 'park_wait',
                situation: '인기 있는 놀이기구라 1시간이나 기다려야 합니다.',
                choices: [
                    { text: '"괜찮아요. 당신과 함께니까"', affection: 18, trust: 20, type: 'patient' },
                    { text: '재미있게 대화하며 시간을 보낸다', affection: 16, trust: 18, type: 'entertaining' },
                    { text: '"다른 거 탈까요?"', affection: 12, trust: 16, type: 'flexible' },
                    { text: '"너무 오래 기다리는데..." 짜증낸다', affection: -12, trust: -15, type: 'impatient' }
                ]
            },
            {
                id: 'park_photo_booth',
                situation: '포토부스를 발견했습니다.',
                choices: [
                    { text: '"같이 찍어요!" 신나게 제안한다', affection: 18, trust: 16, type: 'fun' },
                    { text: '여러 포즈를 만들며 즐긴다', affection: 20, trust: 14, type: 'playful' },
                    { text: '"사진 별로 안 좋아해요"', affection: -10, trust: -8, type: 'refuse' },
                    { text: '한 장만 찍고 끝낸다', affection: 10, trust: 10, type: 'minimal' }
                ]
            },
            {
                id: 'park_tired',
                situation: '상대방이 피곤해 보입니다.',
                choices: [
                    { text: '"벤치에서 쉬어요"', affection: 16, trust: 20, type: 'caring' },
                    { text: '음료수를 사다준다', affection: 18, trust: 18, type: 'thoughtful' },
                    { text: '"조금만 더 놀다 갈까요?"', affection: -8, trust: -10, type: 'insensitive' },
                    { text: '팔짱을 끼며 지지해준다', affection: 17, trust: 19, type: 'supportive' }
                ]
            },
            {
                id: 'park_souvenir',
                situation: '기념품 가게에 들렀습니다.',
                choices: [
                    { text: '"오늘의 기념으로 하나 골라요"', affection: 18, trust: 16, type: 'gift' },
                    { text: '커플 아이템을 제안한다', affection: 20, trust: 18, type: 'couple' },
                    { text: '구경만 한다', affection: 8, trust: 10, type: 'browse' },
                    { text: '"비싸기만 하네요"', affection: -10, trust: -12, type: 'cheap' }
                ]
            }
        ]
    },
    beach: {
        id: 'beach',
        name: '해변 데이트',
        icon: '🏖️',
        cost: 50000,
        stamina: 35,
        baseAffection: 8,
        baseTrust: 6,
        description: '시원한 바다와 낭만적인 해변',
        scenarios: [
            {
                id: 'beach_sunset',
                situation: '아름다운 석양을 봅니다.',
                choices: [
                    { text: '조용히 손을 잡고 감상한다', affection: 18, trust: 20, type: 'romantic' },
                    { text: '"정말 아름답네요. 당신처럼"', affection: 16, trust: 16, type: 'compliment' },
                    { text: '사진을 찍어준다', affection: 14, trust: 14, type: 'photographer' },
                    { text: '휴대폰만 본다', affection: -15, trust: -18, type: 'rude' }
                ]
            },
            {
                id: 'beach_swim',
                situation: '바다에서 수영하자고 합니다.',
                choices: [
                    { text: '"좋아요! 같이 들어가요"', affection: 16, trust: 14, type: 'fun' },
                    { text: '"조심해서 놀아요" 걱정한다', affection: 14, trust: 18, type: 'caring' },
                    { text: '"저는 모래사장에 있을게요"', affection: 8, trust: 10, type: 'decline' },
                    { text: '"수영복 안 가져왔어요"', affection: 6, trust: 8, type: 'unprepared' }
                ]
            },
            {
                id: 'beach_sandcastle',
                situation: '모래성을 만들자고 합니다.',
                choices: [
                    { text: '신나게 같이 만든다', affection: 18, trust: 16, type: 'playful' },
                    { text: '"멋진 성 만들어요!"', affection: 16, trust: 14, type: 'enthusiastic' },
                    { text: '"유치한데요..." 거절한다', affection: -15, trust: -16, type: 'dismissive' },
                    { text: '사진만 찍어준다', affection: 10, trust: 10, type: 'passive' }
                ]
            },
            {
                id: 'beach_cold',
                situation: '바다에서 나와 춥다고 합니다.',
                choices: [
                    { text: '수건으로 감싸준다', affection: 18, trust: 20, type: 'caring' },
                    { text: '따뜻한 음료를 사온다', affection: 16, trust: 18, type: 'thoughtful' },
                    { text: '꼭 안아준다', affection: 20, trust: 16, type: 'warm' },
                    { text: '"제가 춥다고 했잖아요"', affection: -12, trust: -15, type: 'blame' }
                ]
            },
            {
                id: 'beach_shell',
                situation: '예쁜 조개를 발견했습니다.',
                choices: [
                    { text: '"이거 선물할게요"', affection: 16, trust: 14, type: 'gift' },
                    { text: '같이 조개를 찾는다', affection: 14, trust: 16, type: 'together' },
                    { text: '"조개껍질이 많네요"', affection: 8, trust: 8, type: 'casual' },
                    { text: '관심 없이 지나친다', affection: -8, trust: -10, type: 'indifferent' }
                ]
            },
            {
                id: 'beach_wave',
                situation: '큰 파도가 와서 옷이 젖었습니다.',
                choices: [
                    { text: '같이 웃으며 즐긴다', affection: 18, trust: 16, type: 'fun' },
                    { text: '"괜찮아요?" 걱정한다', affection: 14, trust: 18, type: 'caring' },
                    { text: '"조심하라고 했잖아요"', affection: -12, trust: -15, type: 'scold' },
                    { text: '옷을 벗어서 닦아준다', affection: 16, trust: 18, type: 'helpful' }
                ]
            },
            {
                id: 'beach_vendor',
                situation: '해변 상인이 물건을 팝니다.',
                choices: [
                    { text: '"뭐 사줄까요?"', affection: 14, trust: 14, type: 'generous' },
                    { text: '둘이 먹을 간식을 산다', affection: 16, trust: 16, type: 'sharing' },
                    { text: '"필요 없어요"', affection: 6, trust: 8, type: 'skip' },
                    { text: '"바가지네요" 불평한다', affection: -10, trust: -12, type: 'cheap' }
                ]
            },
            {
                id: 'beach_walk',
                situation: '해변을 따라 걷습니다.',
                choices: [
                    { text: '손을 잡고 걷는다', affection: 18, trust: 18, type: 'romantic' },
                    { text: '"경치가 정말 좋네요"', affection: 14, trust: 14, type: 'appreciative' },
                    { text: '발을 바다에 담그며 걷는다', affection: 16, trust: 16, type: 'playful' },
                    { text: '빨리 걸어서 뒤처지게 한다', affection: -12, trust: -15, type: 'inconsiderate' }
                ]
            },
            {
                id: 'beach_photo',
                situation: '사진 찍기 좋은 장소입니다.',
                choices: [
                    { text: '멋진 사진을 찍어준다', affection: 16, trust: 16, type: 'photographer' },
                    { text: '"같이 찍어요"', affection: 18, trust: 14, type: 'together' },
                    { text: '"이따가 찍어요"', affection: 6, trust: 8, type: 'later' },
                    { text: '"사진 또요?"', affection: -10, trust: -12, type: 'annoyed' }
                ]
            },
            {
                id: 'beach_evening',
                situation: '해가 지고 밤이 됩니다.',
                choices: [
                    { text: '"별이 예쁘네요"', affection: 18, trust: 18, type: 'romantic' },
                    { text: '가까이 다가가서 어깨를 감싼다', affection: 20, trust: 16, type: 'intimate' },
                    { text: '"집에 갈까요?"', affection: 10, trust: 12, type: 'end' },
                    { text: '"춥네요" 빨리 가자고 한다', affection: -8, trust: -10, type: 'hurry' }
                ]
            }
        ]
    },
    museum: {
        id: 'museum',
        name: '미술관/박물관',
        icon: '🖼️',
        cost: 35000,
        stamina: 30,
        baseAffection: 7,
        baseTrust: 10,
        description: '문화적이고 지적인 데이트',
        scenarios: [
            {
                id: 'museum_art',
                situation: '추상화 앞에 섭니다. 의미를 묻습니다.',
                choices: [
                    { text: '자신의 해석을 진지하게 설명한다', affection: 14, trust: 18, type: 'intellectual' },
                    { text: '"당신은 어떻게 생각해요?"', affection: 12, trust: 20, type: 'curious' },
                    { text: '"저도 잘 모르겠어요" 솔직하게 말한다', affection: 10, trust: 16, type: 'honest' },
                    { text: '"이해가 안 가네요"', affection: -8, trust: -10, type: 'dismissive' }
                ]
            },
            {
                id: 'museum_guide',
                situation: '오디오 가이드를 빌릴까 물어봅니다.',
                choices: [
                    { text: '"같이 들어요"', affection: 14, trust: 16, type: 'together' },
                    { text: '"제가 설명해줄게요"', affection: 16, trust: 18, type: 'knowledgeable' },
                    { text: '"필요 없어요. 그냥 볼까요?"', affection: 10, trust: 12, type: 'casual' },
                    { text: '"돈 아까워요"', affection: -12, trust: -14, type: 'cheap' }
                ]
            },
            {
                id: 'museum_favorite',
                situation: '"이 작품이 마음에 들어요"라고 말합니다.',
                choices: [
                    { text: '"왜 좋아하세요?" 관심있게 듣는다', affection: 14, trust: 20, type: 'interested' },
                    { text: '"저도 이 작품 좋아해요"', affection: 16, trust: 16, type: 'agree' },
                    { text: '"저는 저게 더 좋은데요"', affection: 8, trust: 12, type: 'different' },
                    { text: '"별로 안 예쁜데요"', affection: -15, trust: -18, type: 'dismiss' }
                ]
            },
            {
                id: 'museum_photo',
                situation: '사진 촬영이 금지된 곳에서 사진을 찍으려 합니다.',
                choices: [
                    { text: '"여기 사진 찍으면 안 돼요"', affection: 10, trust: 22, type: 'rule_follower' },
                    { text: '"나중에 밖에서 찍어요"', affection: 12, trust: 18, type: 'suggest_alternative' },
                    { text: '같이 몰래 찍는다', affection: 15, trust: -10, type: 'rebellious' },
                    { text: '무시하고 지나간다', affection: 5, trust: 8, type: 'ignore' }
                ]
            },
            {
                id: 'museum_bench',
                situation: '벤치에 앉아 쉬자고 합니다.',
                choices: [
                    { text: '"좋아요. 천천히 쉬어요"', affection: 14, trust: 18, type: 'caring' },
                    { text: '같이 앉아 작품을 감상한다', affection: 16, trust: 20, type: 'together' },
                    { text: '"조금만 더 보고 쉬어요"', affection: 8, trust: 10, type: 'insensitive' },
                    { text: '피곤해하는 모습을 드러낸다', affection: -10, trust: -12, type: 'impatient' }
                ]
            },
            {
                id: 'museum_shop',
                situation: '뮤지엄 숍에 들렀습니다.',
                choices: [
                    { text: '"기념품 하나 고를래요?"', affection: 16, trust: 16, type: 'gift' },
                    { text: '같이 구경하며 재미있게 둘러본다', affection: 14, trust: 14, type: 'fun' },
                    { text: '"비싸네요. 나가요"', affection: -10, trust: -12, type: 'cheap' },
                    { text: '관심 없이 빨리 나간다', affection: -8, trust: -10, type: 'rush' }
                ]
            },
            {
                id: 'museum_sculpture',
                situation: '유명한 조각상 앞입니다.',
                choices: [
                    { text: '"정말 대단하네요"', affection: 12, trust: 16, type: 'appreciative' },
                    { text: '같은 포즈를 취하며 웃긴다', affection: 16, trust: 12, type: 'playful' },
                    { text: '조각에 대해 설명한다', affection: 14, trust: 18, type: 'informative' },
                    { text: '"그냥 돌덩이네요"', affection: -12, trust: -15, type: 'disrespectful' }
                ]
            },
            {
                id: 'museum_cafe',
                situation: '미술관 카페에서 쉽니다.',
                choices: [
                    { text: '"뭐 마실래요? 제가 살게요"', affection: 14, trust: 16, type: 'treat' },
                    { text: '오늘 본 작품에 대해 이야기한다', affection: 16, trust: 20, type: 'discuss' },
                    { text: '"피곤하네요"', affection: 8, trust: 10, type: 'tired' },
                    { text: '휴대폰만 본다', affection: -12, trust: -15, type: 'rude' }
                ]
            },
            {
                id: 'museum_quiet',
                situation: '조용한 전시실입니다.',
                choices: [
                    { text: '속삭이며 조용히 대화한다', affection: 14, trust: 18, type: 'respectful' },
                    { text: '손을 잡고 조용히 관람한다', affection: 16, trust: 16, type: 'romantic' },
                    { text: '큰 소리로 이야기한다', affection: -15, trust: -20, type: 'rude' },
                    { text: '아무 말 없이 같이 관람한다', affection: 12, trust: 14, type: 'calm' }
                ]
            },
            {
                id: 'museum_exit',
                situation: '관람을 마치고 나옵니다.',
                choices: [
                    { text: '"오늘 정말 좋았어요"', affection: 16, trust: 18, type: 'happy' },
                    { text: '"다음에 또 같이 와요"', affection: 18, trust: 20, type: 'future' },
                    { text: '"이제 뭐 할까요?"', affection: 12, trust: 14, type: 'next' },
                    { text: '"지루했어요"', affection: -15, trust: -18, type: 'bored' }
                ]
            }
        ]
    },
    park_picnic: {
        id: 'park_picnic',
        name: '공원 피크닉',
        icon: '🧺',
        cost: 30000,
        stamina: 25,
        baseAffection: 6,
        baseTrust: 8,
        description: '평화로운 공원에서 피크닉',
        scenarios: [
            {
                id: 'picnic_prepare',
                situation: '피크닉 준비물을 챙겼습니다.',
                choices: [
                    { text: '"모든 걸 다 준비했어요"', affection: 18, trust: 20, type: 'prepared' },
                    { text: '"같이 샌드위치 만들어요"', affection: 16, trust: 18, type: 'together' },
                    { text: '"편의점에서 살까요?"', affection: 10, trust: 12, type: 'casual' },
                    { text: '"준비 안 했어요"', affection: -12, trust: -15, type: 'unprepared' }
                ]
            },
            {
                id: 'picnic_spot',
                situation: '자리를 찾습니다.',
                choices: [
                    { text: '나무 그늘 아래 좋은 자리를 찾는다', affection: 16, trust: 18, type: 'thoughtful' },
                    { text: '"어디가 좋아요?"', affection: 12, trust: 16, type: 'ask' },
                    { text: '아무 데나 앉는다', affection: 8, trust: 10, type: 'casual' },
                    { text: '사람 많은 곳에 앉는다', affection: -8, trust: -10, type: 'inconsiderate' }
                ]
            },
            {
                id: 'picnic_blanket',
                situation: '돗자리를 깝니다.',
                choices: [
                    { text: '정성스럽게 펼치고 정리한다', affection: 14, trust: 18, type: 'neat' },
                    { text: '같이 펼친다', affection: 12, trust: 16, type: 'together' },
                    { text: '대충 펼친다', affection: 8, trust: 10, type: 'careless' },
                    { text: '"당신이 펼쳐요"', affection: -10, trust: -12, type: 'lazy' }
                ]
            },
            {
                id: 'picnic_food',
                situation: '준비한 음식을 꺼냅니다.',
                choices: [
                    { text: '"좋아하는 걸로 준비했어요"', affection: 18, trust: 20, type: 'thoughtful' },
                    { text: '같이 나눠 먹는다', affection: 16, trust: 18, type: 'sharing' },
                    { text: '음식이 별로다', affection: -12, trust: -15, type: 'complain' },
                    { text: '"배고프네요" 많이 먹는다', affection: 10, trust: 12, type: 'hungry' }
                ]
            },
            {
                id: 'picnic_talk',
                situation: '평화로운 분위기에서 대화합니다.',
                choices: [
                    { text: '깊은 대화를 나눈다', affection: 16, trust: 22, type: 'deep' },
                    { text: '가벼운 농담을 주고받는다', affection: 14, trust: 16, type: 'fun' },
                    { text: '조용히 경치를 즐긴다', affection: 12, trust: 18, type: 'peaceful' },
                    { text: '휴대폰만 본다', affection: -15, trust: -20, type: 'rude' }
                ]
            },
            {
                id: 'picnic_nap',
                situation: '상대방이 졸립다고 합니다.',
                choices: [
                    { text: '"무릎 베고 자세요"', affection: 20, trust: 18, type: 'romantic' },
                    { text: '"잠깐 자도 돼요"', affection: 14, trust: 20, type: 'caring' },
                    { text: '같이 눕는다', affection: 18, trust: 16, type: 'together' },
                    { text: '"집에 가서 자요"', affection: -10, trust: -12, type: 'insensitive' }
                ]
            },
            {
                id: 'picnic_frisbee',
                situation: '프리스비나 공을 가져왔습니다.',
                choices: [
                    { text: '신나게 같이 논다', affection: 18, trust: 16, type: 'active' },
                    { text: '"조금만 놀다 쉬어요"', affection: 14, trust: 14, type: 'moderate' },
                    { text: '"저는 그냥 앉아있을게요"', affection: -8, trust: -10, type: 'lazy' },
                    { text: '게임을 제안한다', affection: 16, trust: 14, type: 'playful' }
                ]
            },
            {
                id: 'picnic_weather',
                situation: '날씨가 완벽합니다.',
                choices: [
                    { text: '"날씨처럼 완벽한 하루예요"', affection: 18, trust: 16, type: 'romantic' },
                    { text: '"정말 좋은 날씨네요"', affection: 14, trust: 14, type: 'appreciative' },
                    { text: '"좀 덥네요"', affection: 6, trust: 8, type: 'complain' },
                    { text: '그냥 즐긴다', affection: 12, trust: 12, type: 'enjoy' }
                ]
            },
            {
                id: 'picnic_cleanup',
                situation: '정리할 시간입니다.',
                choices: [
                    { text: '깔끔하게 정리한다', affection: 14, trust: 20, type: 'responsible' },
                    { text: '같이 정리한다', affection: 16, trust: 18, type: 'together' },
                    { text: '대충 정리한다', affection: -8, trust: -12, type: 'careless' },
                    { text: '"당신이 정리해요"', affection: -15, trust: -18, type: 'lazy' }
                ]
            },
            {
                id: 'picnic_end',
                situation: '피크닉이 끝났습니다.',
                choices: [
                    { text: '"오늘 정말 행복했어요"', affection: 18, trust: 18, type: 'happy' },
                    { text: '"다음에 또 와요"', affection: 16, trust: 20, type: 'future' },
                    { text: '"집에 갈까요?"', affection: 12, trust: 14, type: 'end' },
                    { text: '"좀 지루했어요"', affection: -15, trust: -18, type: 'bored' }
                ]
            }
        ]
    }
};

// 선물 아이템 데이터
const GIFT_ITEMS = {
    // 저가 선물 (10,000 - 50,000원)
    letter: {
        id: 'letter',
        name: '손편지',
        icon: '💌',
        cost: 10000,
        stamina: 15,
        baseAffection: 5,
        baseTrust: 8,
        description: '진심이 담긴 손편지 - 신뢰도 상승',
        category: 'heartfelt'
    },
    chocolate: {
        id: 'chocolate',
        name: '고급 초콜릿',
        icon: '🍫',
        cost: 25000,
        stamina: 10,
        baseAffection: 4,
        baseTrust: 3,
        description: '달콤한 초콜릿 선물',
        category: 'sweet'
    },
    cake: {
        id: 'cake',
        name: '조각 케이크',
        icon: '🍰',
        cost: 30000,
        stamina: 10,
        baseAffection: 3,
        baseTrust: 3,
        description: '달콤한 디저트로 기분 전환',
        category: 'sweet'
    },
    book: {
        id: 'book',
        name: '책',
        icon: '📚',
        cost: 35000,
        stamina: 10,
        baseAffection: 6,
        baseTrust: 10,
        description: '취향을 고려한 책 선물 - 신뢰도 상승',
        category: 'thoughtful'
    },
    movie_ticket: {
        id: 'movie_ticket',
        name: '영화 티켓',
        icon: '🎬',
        cost: 40000,
        stamina: 10,
        baseAffection: 5,
        baseTrust: 6,
        description: '함께 보자는 의미의 영화 티켓',
        category: 'experience'
    },

    // 중가 선물 (50,000 - 300,000원)
    flower: {
        id: 'flower',
        name: '꽃다발',
        icon: '💐',
        cost: 50000,
        stamina: 10,
        baseAffection: 6,
        baseTrust: 4,
        description: '로맨틱한 분위기를 연출',
        category: 'romantic'
    },
    plushie: {
        id: 'plushie',
        name: '인형',
        icon: '🧸',
        cost: 80000,
        stamina: 10,
        baseAffection: 7,
        baseTrust: 5,
        description: '귀여운 대형 인형',
        category: 'cute'
    },
    scarf: {
        id: 'scarf',
        name: '스카프/목도리',
        icon: '🧣',
        cost: 120000,
        stamina: 10,
        baseAffection: 8,
        baseTrust: 7,
        description: '실용적이면서 따뜻한 선물',
        category: 'practical'
    },
    necklace: {
        id: 'necklace',
        name: '목걸이',
        icon: '📿',
        cost: 250000,
        stamina: 10,
        baseAffection: 9,
        baseTrust: 6,
        description: '은은한 액세서리',
        category: 'accessory'
    },
    perfume: {
        id: 'perfume',
        name: '향수/화장품',
        icon: '💄',
        cost: 300000,
        stamina: 10,
        baseAffection: 10,
        baseTrust: 6,
        description: '취향을 타지만 성공 시 효과 큼',
        category: 'luxury'
    },

    // 고가 선물 (300,000 - 1,000,000원)
    shoes: {
        id: 'shoes',
        name: '구두/운동화',
        icon: '👠',
        cost: 400000,
        stamina: 10,
        baseAffection: 11,
        baseTrust: 7,
        description: '브랜드 신발 선물',
        category: 'fashion'
    },
    watch: {
        id: 'watch',
        name: '시계',
        icon: '⌚',
        cost: 600000,
        stamina: 10,
        baseAffection: 13,
        baseTrust: 8,
        description: '세련된 손목시계',
        category: 'accessory'
    },
    earrings: {
        id: 'earrings',
        name: '귀걸이',
        icon: '💎',
        cost: 800000,
        stamina: 10,
        baseAffection: 14,
        baseTrust: 7,
        description: '고급 귀금속 귀걸이',
        category: 'jewelry'
    },
    coat: {
        id: 'coat',
        name: '코트/외투',
        icon: '🧥',
        cost: 900000,
        stamina: 10,
        baseAffection: 12,
        baseTrust: 9,
        description: '고급 브랜드 외투',
        category: 'fashion'
    },

    // 최고가 선물 (1,000,000원 이상)
    laptop: {
        id: 'laptop',
        name: '노트북',
        icon: '💻',
        cost: 2000000,
        stamina: 10,
        baseAffection: 15,
        baseTrust: 12,
        description: '고사양 노트북 - 실용성 최고',
        category: 'electronics'
    },
    travel_package: {
        id: 'travel_package',
        name: '해외여행 패키지',
        icon: '✈️',
        cost: 3000000,
        stamina: 10,
        baseAffection: 18,
        baseTrust: 15,
        description: '함께 떠나는 낭만적인 여행',
        category: 'experience'
    },
    bag: {
        id: 'bag',
        name: '명품 가방',
        icon: '👜',
        cost: 4500000,
        stamina: 10,
        baseAffection: 16,
        baseTrust: 8,
        description: '고가의 명품으로 대폭 상승',
        category: 'premium'
    },
    car: {
        id: 'car',
        name: '자동차',
        icon: '🚗',
        cost: 6000000,
        stamina: 10,
        baseAffection: 22,
        baseTrust: 10,
        description: '꿈의 선물, 하지만 부담스러울 수도',
        category: 'luxury',
        riskFactor: 0.3  // 30% 확률로 부담스러워함
    },
    ring: {
        id: 'ring',
        name: '다이아 반지',
        icon: '💍',
        cost: 7000000,
        stamina: 10,
        baseAffection: 20,
        baseTrust: 12,
        description: '프로포즈 필수 아이템',
        category: 'proposal',
        proposalBonus: 15
    }
};

// 대화 주제 데이터
const TALK_TOPICS = {
    daily: {
        id: 'daily',
        name: '일상 이야기',
        icon: '☀️',
        stamina: 10,  // 가벼운 일상 대화
        baseAffection: 2,
        baseTrust: 2,
        description: '오늘 있었던 일을 나눕니다',
        scenarios: [
            {
                id: 'daily_work',
                situation: '오늘 회사에서 힘든 일이 있었다고 합니다.',
                choices: [
                    { text: '"그래서 어떻게 했어요? 정말 힘드셨겠어요. 괜찮으세요?" 진심으로 걱정하며 물어본다', affection: 6, trust: 15, type: 'listen' },
                    { text: '"제가 뭐라도 도와드릴 수 있을까요? 말씀만 하시면 언제든지 달려갈게요"', affection: 7, trust: 18, type: 'help' },
                    { text: '"회사 생활이 원래 다 그런 거 아니에요? 너무 예민하게 받아들이시는 거 아닌가..." 대수롭지 않게 넘긴다', affection: -5, trust: -8, type: 'dismissive' }
                ]
            },
            {
                id: 'daily_hobby',
                situation: '요즘 새로운 취미를 시작했다고 합니다.',
                choices: [
                    { text: '"오 재밌겠다! 구체적으로 어떤 건데요? 더 자세히 얘기해줘요!" 흥미롭게 반응한다', affection: 7, trust: 10, type: 'interest' },
                    { text: '"우와, 저도 예전부터 관심 있었는데... 혹시 저도 함께 해도 될까요? 같이 하면 더 재미있을 것 같아요"', affection: 9, trust: 15, type: 'join' },
                    { text: '"그런 거 하실 시간이 있으세요? 시간 많으시네요..." 비꼬는 투로 말한다', affection: -8, trust: -12, type: 'sarcastic' }
                ]
            },
            {
                id: 'daily_food',
                situation: '오늘 점심으로 무엇을 먹었는지 물어봅니다.',
                choices: [
                    { text: '"저는 파스타 먹었어요! 정말 맛있었는데, 다음에 같이 가서 먹어요. 당신도 분명 좋아하실 거예요" 흥미롭게 이야기하며 같이 먹으러 가자고 제안한다', affection: 9, trust: 12, type: 'enthusiastic' },
                    { text: '"저는 간단하게 김밥 먹었어요. 그나저나 당신은 뭐 드셨어요? 맛있게 드셨나요?" 간단히 대답하고 상대방 이야기에 관심을 보인다', affection: 7, trust: 15, type: 'balanced' },
                    { text: '"그런 게 뭐가 중요해요? 별로 중요한 얘기 아니잖아요" 시큰둥하게 반응한다', affection: -6, trust: -10, type: 'rude' }
                ]
            },
            {
                id: 'daily_weather',
                situation: '"오늘 날씨 정말 좋지 않아요?"라고 말합니다.',
                choices: [
                    { text: '"그러게요, 정말 화창하네요. 이런 날은 밖에 나가서 산책하기 딱 좋은 것 같아요"', affection: 7, trust: 10, type: 'agree' },
                    { text: '"날씨가 좋든 안 좋든, 당신이랑 함께 있으면 그게 제일 좋은 날씨죠" 로맨틱하게 말한다', affection: 10, trust: 8, type: 'romantic' },
                    { text: '휴대폰만 보면서 "네... 그러네요..." 무성의하게 답하고 계속 핸드폰만 본다', affection: -7, trust: -15, type: 'distracted' }
                ]
            },
            {
                id: 'daily_friend',
                situation: '친구와 만나서 재미있는 일이 있었다고 얘기합니다.',
                choices: [
                    { text: '"오, 어떤 친구예요? 어떻게 알게 된 사이인지 궁금한데, 언젠가 저한테도 소개시켜줄래요?"', affection: 8, trust: 12, type: 'curious' },
                    { text: '"우와 정말 재밌었겠다! 다음에 친구들 만날 때 저도 같이 가도 될까요? 저도 함께하고 싶어요"', affection: 10, trust: 15, type: 'inclusive' },
                    { text: '"요즘 친구 만나느라 바쁘시네요... 저랑 보내는 시간보다 더 많은 거 아니에요?" 삐친 듯이 말한다', affection: -10, trust: -12, type: 'jealous' }
                ]
            },
            {
                id: 'daily_family',
                situation: '가족 이야기를 꺼냅니다. "우리 부모님이..."',
                choices: [
                    { text: '"정말요? 가족분들 이야기 들으니 너무 좋네요. 기회가 되면 부모님도 꼭 뵙고 싶어요"', affection: 12, trust: 20, type: 'respectful' },
                    { text: '"당신 가족 이야기 들으면 항상 느끼는 건데, 가족을 정말 소중히 여기시는 것 같아요. 그런 모습 정말 멋있어요"', affection: 9, trust: 15, type: 'supportive' },
                    { text: '"아, 네... 그렇군요..." 별로 관심 없다는 듯이 건성으로 반응한다', affection: -8, trust: -18, type: 'uninterested' }
                ]
            },
            {
                id: 'daily_tired_morning',
                situation: '"오늘 아침에 늦잠자서 정신없었어요"',
                choices: [
                    { text: '"하하, 그러셨구나. 다음엔 제가 모닝콜 해드릴까요? 매일 아침 깨워드릴 수 있어요" 웃으며 장난스럽게 말한다', affection: 10, trust: 8, type: 'playful' },
                    { text: '"많이 피곤하셨나봐요. 어젯밤에 늦게 주무셨나요? 오늘 충분히 쉬셨으면 좋겠어요"', affection: 8, trust: 12, type: 'caring' },
                    { text: '"시간 관리를 좀 하셔야죠. 매번 그러시면 곤란한데요" 핀잔을 준다', affection: -12, trust: -15, type: 'criticizing' }
                ]
            },
            {
                id: 'daily_shopping',
                situation: '오늘 쇼핑하다가 마음에 드는 물건을 봤다고 합니다.',
                choices: [
                    { text: '"오, 뭔데요? 어떤 거예요? 궁금한데, 나중에 시간 나면 같이 보러 갈까요?"', affection: 10, trust: 10, type: 'interested' },
                    { text: '"정말요? 그럼 사고 싶으시면 사세요. 제가 선물로 사드릴게요. 어떤 거예요?" 선뜻 제안한다', affection: 12, trust: 8, type: 'generous' },
                    { text: '"요즘 또 쇼핑하셨어요? 돈 좀 아껴 쓰시는 게 어때요? 너무 많이 쓰시는 거 아니에요?" 잔소리한다', affection: -15, trust: -10, type: 'judgmental' }
                ]
            },
            {
                id: 'daily_music',
                situation: '요즘 자주 듣는 노래가 있다며 들려줍니다.',
                choices: [
                    { text: '함께 감상하며 "좋은데요? 이런 스타일 좋아하세요?"', affection: 9, trust: 12, type: 'appreciative' },
                    { text: '노래를 끝까지 듣고 "같이 노래방 갈래요?"', affection: 11, trust: 10, type: 'engaging' },
                    { text: '중간에 끊고 "제 취향은 아닌데요"', affection: -10, trust: -12, type: 'dismissive' }
                ]
            },
            {
                id: 'daily_book',
                situation: '최근에 읽은 책 이야기를 합니다.',
                choices: [
                    { text: '"재밌어 보이네요! 다 읽으면 빌려주실래요?"', affection: 10, trust: 15, type: 'sharing' },
                    { text: '"저도 그 작가 좋아해요!" 공통 관심사에 대해 이야기한다', affection: 12, trust: 18, type: 'bonding' },
                    { text: '"전 책은 잘 안 읽어서..." 화제를 바꾼다', affection: -5, trust: -8, type: 'deflecting' }
                ]
            },
            {
                id: 'daily_exercise',
                situation: '"요즘 운동 시작했어요!" 라고 말합니다.',
                choices: [
                    { text: '"대단한데요! 어떤 운동이에요?"', affection: 8, trust: 10, type: 'encouraging' },
                    { text: '"저도 같이 하면 안 될까요?"', affection: 11, trust: 15, type: 'participating' },
                    { text: '"오래 못 가실 걸요" 냉소적으로 말한다', affection: -12, trust: -18, type: 'cynical' }
                ]
            },
            {
                id: 'daily_pet',
                situation: '키우는 반려동물 이야기를 합니다.',
                choices: [
                    { text: '"귀엽겠어요! 사진 보여주세요"', affection: 10, trust: 12, type: 'interested' },
                    { text: '"다음에 같이 산책시켜요"', affection: 12, trust: 15, type: 'active' },
                    { text: '"동물 냄새 안 나요?" 찡그리며 말한다', affection: -15, trust: -20, type: 'rude' }
                ]
            },
            {
                id: 'daily_nightmare',
                situation: '"어젯밤에 악몽 꿨어요. 당신이 떠나는 꿈이었어요"',
                choices: [
                    { text: '"절대 안 떠나요!" 즉시 대답한다', affection: 15, trust: -5, type: 'quick_reassure' },
                    { text: '"그런 일 없을 거예요" 진지하게 약속한다', affection: 10, trust: 20, type: 'promise' },
                    { text: '"꿈은 반대래요" 가볍게 넘긴다', affection: -8, trust: -12, type: 'dismiss' }
                ]
            },
            {
                id: 'daily_compliment',
                situation: '오늘 다른 사람에게 칭찬을 받았다고 기뻐합니다.',
                choices: [
                    { text: '"누가요? 무슨 칭찬이었어요?"', affection: 5, trust: 15, type: 'curious' },
                    { text: '"당연하죠! 당신은 정말 멋져요"', affection: 12, trust: 8, type: 'supportive' },
                    { text: '"그 사람 당신 좋아하는 거 아니에요?" 의심한다', affection: -12, trust: -18, type: 'jealous' }
                ]
            },
            {
                id: 'daily_haircut',
                situation: '머리를 자르고 왔습니다. "어때요?"',
                choices: [
                    { text: '"정말 잘 어울려요!" 진심으로 칭찬한다', affection: 12, trust: 10, type: 'compliment' },
                    { text: '"달라 보이긴 하네요" 애매하게 답한다', affection: -5, trust: 5, type: 'vague' },
                    { text: '"전 머리가 더 좋았는데..." 솔직하게 말한다', affection: -15, trust: 15, type: 'too_honest' }
                ]
            },
            {
                id: 'daily_late_reply',
                situation: '"왜 답장이 늦었어요?" 조금 삐진 듯 물어봅니다.',
                choices: [
                    { text: '솔직하게 바빴던 이유를 설명한다', affection: 5, trust: 20, type: 'honest' },
                    { text: '"미안해요, 다음엔 바로 답할게요" 사과한다', affection: 10, trust: 12, type: 'apologize' },
                    { text: '"항상 바로 답할 수는 없잖아요" 변명한다', affection: -10, trust: -15, type: 'defensive' }
                ]
            },
            {
                id: 'daily_memories',
                situation: '"우리 처음 만났을 때 기억나요?"',
                choices: [
                    { text: '자세하게 기억을 되짚으며 이야기한다', affection: 18, trust: 20, type: 'detailed' },
                    { text: '"그럼요! 정말 떨렸어요" 감정을 표현한다', affection: 15, trust: 15, type: 'emotional' },
                    { text: '"어... 대충요?" 기억이 흐릿한 척한다', affection: -20, trust: -25, type: 'forgot' }
                ]
            },
            {
                id: 'daily_social_media',
                situation: '"제 SNS 게시물 봤어요?" 기대하는 표정으로 묻습니다.',
                choices: [
                    { text: '"봤어요! 정말 좋더라고요" 즉시 반응한다', affection: 12, trust: 10, type: 'saw' },
                    { text: '"아직 못 봤는데, 지금 볼게요!" 바로 확인한다', affection: 10, trust: 15, type: 'check_now' },
                    { text: '"SNS 잘 안 봐서..." 무관심하게 말한다', affection: -15, trust: -10, type: 'indifferent' }
                ]
            },
            {
                id: 'daily_cooking',
                situation: '오늘 요리를 했다며 자랑스러워합니다.',
                choices: [
                    { text: '"대단한데요! 다음엔 저한테도 해줄래요?"', affection: 12, trust: 15, type: 'interested' },
                    { text: '"맛있었겠다! 사진 있어요?"', affection: 10, trust: 10, type: 'ask_photo' },
                    { text: '"잘하시네요" 무덤덤하게 반응한다', affection: -5, trust: -8, type: 'bland' }
                ]
            },
            {
                id: 'daily_promotion',
                situation: '직장에서 승진 기회가 생겼다고 합니다. 하지만 더 바빠질 것 같습니다.',
                choices: [
                    { text: '"축하해요! 정말 잘됐네요" 무조건 응원한다', affection: 15, trust: 10, type: 'support' },
                    { text: '"좋지만... 우리 만날 시간은 괜찮을까요?" 걱정을 표현한다', affection: -5, trust: 20, type: 'honest_worry' },
                    { text: '"승진보다 저랑 시간이 더 중요하지 않나요?" 압박한다', affection: -20, trust: -25, type: 'selfish' }
                ]
            },
            {
                id: 'daily_old_photo',
                situation: '옛날 사진을 보며 "그때가 좋았어요" 라고 말합니다.',
                choices: [
                    { text: '"지금이 더 좋지 않나요?" 현재를 강조한다', affection: 12, trust: 15, type: 'present' },
                    { text: '"그때도 좋았지만 앞으로가 더 기대돼요"', affection: 15, trust: 18, type: 'future' },
                    { text: '"과거에 너무 집착하시는 거 아니에요?"', affection: -15, trust: -12, type: 'critical' }
                ]
            },
            {
                id: 'daily_pet',
                situation: '"반려동물을 키우고 싶어요" 라고 말합니다.',
                choices: [
                    { text: '"좋아요! 같이 준비해봐요"', affection: 18, trust: 20, type: 'supportive' },
                    { text: '"신중하게 생각해봐요. 책임이 크니까"', affection: 8, trust: 22, type: 'realistic' },
                    { text: '"저는 동물 별로 안 좋아하는데..."', affection: -12, trust: -10, type: 'negative' }
                ]
            },
            {
                id: 'daily_diet_success',
                situation: '"다이어트 성공했어요! 3kg 빠졌어요"',
                choices: [
                    { text: '"정말 대단해요! 노력한 보람이 있네요"', affection: 15, trust: 18, type: 'proud' },
                    { text: '"원래도 예뻤는데 더 예뻐졌네요"', affection: 18, trust: 12, type: 'compliment' },
                    { text: '"겨우 3kg요?" 하찮게 여긴다', affection: -20, trust: -22, type: 'dismissive' }
                ]
            },
            {
                id: 'daily_app_recommendation',
                situation: '"이 앱 정말 유용해요. 써보세요!"',
                choices: [
                    { text: '"오 좋아보이네요. 바로 깔아볼게요"', affection: 14, trust: 16, type: 'interested' },
                    { text: '"추천해줘서 고마워요"', affection: 12, trust: 14, type: 'grateful' },
                    { text: '"저는 그런 거 안 써요" 무시한다', affection: -10, trust: -12, type: 'reject' }
                ]
            },
            {
                id: 'daily_music',
                situation: '"요즘 이 노래만 들어요" 노래를 들려줍니다.',
                choices: [
                    { text: '"좋은데요? 저도 플레이리스트에 추가할게요"', affection: 16, trust: 14, type: 'appreciate' },
                    { text: '같이 듣자고 이어폰을 나눠준다', affection: 18, trust: 16, type: 'share' },
                    { text: '"제 취향은 아닌데..." 솔직하게 말한다', affection: -8, trust: 12, type: 'honest' }
                ]
            },
            {
                id: 'daily_achievement',
                situation: '"오늘 작은 목표를 달성했어요!"',
                choices: [
                    { text: '"축하해요! 대단해요"', affection: 15, trust: 16, type: 'celebrate' },
                    { text: '"어떤 기분이었어요?" 공감하며 듣는다', affection: 12, trust: 20, type: 'empathize' },
                    { text: '"별 거 아닌 것 같은데요"', affection: -18, trust: -20, type: 'belittle' }
                ]
            },
            {
                id: 'daily_book_read',
                situation: '읽고 있는 책에 대해 열정적으로 이야기합니다.',
                choices: [
                    { text: '"흥미로운데요? 더 얘기해줘요"', affection: 14, trust: 18, type: 'interested' },
                    { text: '"저도 읽어볼게요. 추천해줘서 고마워요"', affection: 16, trust: 20, type: 'grateful' },
                    { text: '"책은 지루해요" 관심 없이 말한다', affection: -12, trust: -15, type: 'dismissive' }
                ]
            },
            {
                id: 'daily_random_thought',
                situation: '"문득 이런 생각이 들었어요..." 사소한 생각을 말합니다.',
                choices: [
                    { text: '"재미있는데요? 왜 그런 생각을 했어요?"', affection: 14, trust: 18, type: 'curious' },
                    { text: '진지하게 들어주고 자신의 생각도 나눈다', affection: 12, trust: 20, type: 'discuss' },
                    { text: '"이상한 생각 하시네요" 웃으며 넘긴다', affection: -8, trust: -10, type: 'mock' }
                ]
            },
            {
                id: 'daily_traffic',
                situation: '"오늘 출근길이 정말 막혔어요" 짜증스러워합니다.',
                choices: [
                    { text: '"힘드셨겠어요. 오늘 하루 고생하셨네요"', affection: 14, trust: 18, type: 'empathy' },
                    { text: '"그럴 땐 일찍 출발하세요"', affection: -10, trust: 5, type: 'advice' },
                    { text: '"저도 그랬어요" 공감한다', affection: 10, trust: 12, type: 'relate' }
                ]
            },
            {
                id: 'daily_schedule',
                situation: '"내일 일정이 너무 빡빡해요..."',
                choices: [
                    { text: '"제가 도와드릴 수 있는 게 있을까요?"', affection: 16, trust: 20, type: 'help' },
                    { text: '"힘내세요! 당신이라면 잘 해낼 거예요"', affection: 14, trust: 16, type: 'encourage' },
                    { text: '"그럼 오늘은 일찍 주무세요"', affection: 12, trust: 18, type: 'caring' }
                ]
            },
            {
                id: 'daily_favorite_food',
                situation: '"요즘 제일 좋아하는 음식이 뭐예요?"',
                choices: [
                    { text: '자세히 설명하고 같이 먹으러 가자고 한다', affection: 16, trust: 14, type: 'enthusiastic' },
                    { text: '"당신은요?" 되물어본다', affection: 10, trust: 16, type: 'curious' },
                    { text: '"별로 생각 안 해봤어요"', affection: -6, trust: -8, type: 'indifferent' }
                ]
            },
            {
                id: 'daily_childhood',
                situation: '어렸을 때 이야기를 꺼냅니다.',
                choices: [
                    { text: '관심있게 들으며 질문한다', affection: 14, trust: 20, type: 'interested' },
                    { text: '자신의 어린 시절 이야기도 나눈다', affection: 16, trust: 18, type: 'share' },
                    { text: '"과거 얘기는 별로예요"', affection: -12, trust: -15, type: 'reject' }
                ]
            },
            {
                id: 'daily_movie_want',
                situation: '"이 영화 보고 싶어요" 영화를 추천합니다.',
                choices: [
                    { text: '"같이 보러 가요!"', affection: 18, trust: 16, type: 'date' },
                    { text: '"재미있어 보이네요. 평 좋은가요?"', affection: 12, trust: 14, type: 'interested' },
                    { text: '"그런 장르 안 좋아해요"', affection: -10, trust: -8, type: 'reject' }
                ]
            },
            {
                id: 'daily_shopping',
                situation: '"오늘 쇼핑하면서 이거 샀어요"',
                choices: [
                    { text: '"잘 어울리네요! 좋은 선택이에요"', affection: 15, trust: 14, type: 'compliment' },
                    { text: '"보여주세요! 궁금해요"', affection: 14, trust: 16, type: 'curious' },
                    { text: '"돈 많이 쓰셨네요"', affection: -12, trust: -10, type: 'critical' }
                ]
            },
            {
                id: 'daily_news',
                situation: '오늘 본 뉴스에 대해 이야기합니다.',
                choices: [
                    { text: '진지하게 의견을 나눈다', affection: 12, trust: 20, type: 'discuss' },
                    { text: '"당신 생각은 어때요?" 물어본다', affection: 10, trust: 18, type: 'ask' },
                    { text: '"뉴스는 우울해요" 화제를 돌린다', affection: -6, trust: -8, type: 'avoid' }
                ]
            },
            {
                id: 'daily_song_stuck',
                situation: '"이 노래가 머리에서 안 떠나요" 흥얼거립니다.',
                choices: [
                    { text: '같이 흥얼거리며 즐긴다', affection: 16, trust: 14, type: 'playful' },
                    { text: '"귀엽네요" 웃으며 말한다', affection: 14, trust: 12, type: 'cute' },
                    { text: '"시끄러워요" 짜증낸다', affection: -15, trust: -18, type: 'annoyed' }
                ]
            },
            {
                id: 'daily_makeup',
                situation: '"오늘 화장 잘 먹었어요!"',
                choices: [
                    { text: '"정말 예쁘세요. 빛나는데요?"', affection: 18, trust: 14, type: 'compliment' },
                    { text: '"원래도 예쁘잖아요"', affection: 15, trust: 16, type: 'sweet' },
                    { text: '"차이를 모르겠는데요"', affection: -15, trust: -12, type: 'oblivious' }
                ]
            },
            {
                id: 'daily_class',
                situation: '온라인 강의나 클래스를 수강 중입니다.',
                choices: [
                    { text: '"무슨 내용이에요? 재미있어요?"', affection: 14, trust: 18, type: 'curious' },
                    { text: '"배우려는 모습 멋있어요"', affection: 16, trust: 16, type: 'admire' },
                    { text: '"그런 거 배워서 뭐해요?"', affection: -18, trust: -20, type: 'dismissive' }
                ]
            },
            {
                id: 'daily_furniture',
                situation: '"방 모양을 바꾸고 싶어요. 가구 좀 옮길까 해요"',
                choices: [
                    { text: '"제가 도와드릴게요!"', affection: 18, trust: 20, type: 'helpful' },
                    { text: '"어떻게 바꿀 건데요? 상상이 안 가는데"', affection: 12, trust: 14, type: 'curious' },
                    { text: '"힘들게 왜 그래요? 그냥 두세요"', affection: -10, trust: -12, type: 'discouraging' }
                ]
            },
            {
                id: 'daily_plan_canceled',
                situation: '"원래 계획했던 일이 취소됐어요..." 아쉬워합니다.',
                choices: [
                    { text: '"아쉽네요. 다음 기회에 꼭 하세요"', affection: 12, trust: 16, type: 'comfort' },
                    { text: '"제가 기분 풀어드릴게요. 뭐 하고 싶어요?"', affection: 18, trust: 18, type: 'caring' },
                    { text: '"그럴 수도 있죠" 무덤덤하게 반응한다', affection: -8, trust: -10, type: 'indifferent' }
                ]
            },
            {
                id: 'daily_ex_mention',
                situation: '무심코 전 애인 이야기가 나왔습니다. "전에 사귀던 사람이 이런 걸 좋아했었는데..." 상대방의 표정이 미묘하게 변합니다.',
                choices: [
                    { text: '"아, 그랬구나... 근데 지금은 당신이랑 있으니까 더 좋아요"', affection: -5, trust: 10, type: 'recover' },
                    { text: '"미안해요, 별 뜻 없이 한 말이에요" 사과한다', affection: -3, trust: 15, type: 'apologize' },
                    { text: '"왜요? 과거 이야기는 안 돼요?" 방어적으로 나온다', affection: -18, trust: -25, type: 'defensive' }
                ]
            },
            {
                id: 'daily_appearance_critique',
                situation: '상대방이 오늘 새로 한 헤어스타일을 보여줍니다. 솔직히 말하면... 별로 안 어울립니다. "어때요? 바꿔봤어요!"',
                choices: [
                    { text: '"당신은 뭘 해도 예쁘죠. 이것도 잘 어울려요"', affection: 12, trust: -8, type: 'white_lie' },
                    { text: '"색다른데요? 적응하면 더 좋아 보일 것 같아요"', affection: 8, trust: 18, type: 'honest' },
                    { text: '"솔직히... 전 스타일이 더 좋았어요"', affection: -10, trust: 22, type: 'too_honest' }
                ]
            },
            {
                id: 'daily_money_talk',
                situation: '상대방이 요즘 돈 관리에 대해 고민이 많다고 합니다. "저축도 하고 싶고, 투자도 해보고 싶은데 뭐부터 해야 할지 모르겠어요..."',
                choices: [
                    { text: '"제가 아는 방법 알려드릴게요. 같이 공부해요"', affection: 15, trust: 20, type: 'supportive' },
                    { text: '"어려운 문제네요. 전문가 상담 받아보는 게 어때요?"', affection: 8, trust: 16, type: 'realistic' },
                    { text: '"돈 문제는 각자 알아서 하는 게 나아요"', affection: -12, trust: -18, type: 'dismissive' }
                ]
            },
            {
                id: 'daily_criticism_handling',
                situation: '상대방이 말합니다. "아까 제 말에 대답이 좀 차가웠던 것 같은데... 기분 나쁜 일 있었어요?" 당신은 방금 전 대화에서 조금 퉁명스럽게 대답했습니다.',
                choices: [
                    { text: '"아, 미안해요. 그냥 다른 생각하느라... 기분 나쁜 건 아니에요"', affection: 10, trust: 18, type: 'honest' },
                    { text: '"그랬어요? 제가 그랬나... 앞으로 조심할게요"', affection: 12, trust: 20, type: 'apologize' },
                    { text: '"그게 그렇게 신경 쓰였어요?" 불편한 듯 반응한다', affection: -15, trust: -22, type: 'defensive' }
                ]
            },
            {
                id: 'daily_political_view',
                situation: '뉴스를 보다가 사회 이슈에 대한 이야기가 나왔습니다. 상대방과 당신의 의견이 꽤 다릅니다. "저는 이렇게 생각하는데, 당신은 어떻게 생각해요?"',
                choices: [
                    { text: '"그런 견해도 있네요. 저는 조금 다르게 생각하는데..."', affection: 5, trust: 20, type: 'respectful_disagree' },
                    { text: '"그 부분은 동의하기 어렵네요" 솔직하게 말한다', affection: -8, trust: 18, type: 'honest_negative' },
                    { text: '"그게 맞는 거 아니에요. 제 생각이 더 합리적이에요"', affection: -20, trust: -28, type: 'confrontational' }
                ]
            }
        ]
    },
    comfort: {
        id: 'comfort',
        name: '위로하기',
        icon: '🤗',
        stamina: 18,  // 감성적 대화, 체력 더 소모
        baseAffection: 2,
        baseTrust: 3,
        description: '힘든 일을 들어주고 위로합니다',
        scenarios: [
            {
                id: 'comfort_sad',
                situation: '기분이 많이 안 좋아 보입니다. 표정이 어둡습니다.',
                choices: [
                    { text: '조용히 손을 잡아준다', affection: 10, trust: 20, type: 'skinship' },
                    { text: '"무슨 일 있어요? 말해줄래요?" 부드럽게 묻는다', affection: 9, trust: 22, type: 'talk' },
                    { text: '"왜 그래요? 설마 제 때문은 아니죠?" 자기 탓으로 돌린다', affection: -10, trust: -15, type: 'selfish' }
                ]
            },
            {
                id: 'comfort_stress',
                situation: '요즘 스트레스가 많다고 합니다.',
                choices: [
                    { text: '"제가 뭐 도와드릴 게 있을까요?"', affection: 9, trust: 20, type: 'helpful' },
                    { text: '"함께 스트레스 풀러 가요"', affection: 10, trust: 15, type: 'active' },
                    { text: '"누구나 스트레스 받잖아요" 가볍게 넘긴다', affection: -12, trust: -18, type: 'dismissive' }
                ]
            },
            {
                id: 'comfort_tired',
                situation: '피곤해 보입니다. 눈이 충혈되어 있습니다.',
                choices: [
                    { text: '"푹 쉬세요. 제가 옆에 있을게요"', affection: 12, trust: 18, type: 'caring' },
                    { text: '어깨를 주물러준다', affection: 13, trust: 20, type: 'physical' },
                    { text: '"진짜 힘들어 보이네요" 불편한 표정을 짓는다', affection: -8, trust: -10, type: 'uncomfortable' }
                ]
            },
            {
                id: 'comfort_failure',
                situation: '중요한 프로젝트가 실패했다고 말합니다.',
                choices: [
                    { text: '"정말 열심히 하셨는데... 속상하시겠어요"', affection: 11, trust: 25, type: 'empathetic' },
                    { text: '"실패는 성공의 어머니예요. 다음엔 잘 하실 거예요"', affection: 8, trust: 15, type: 'encouraging' },
                    { text: '"그래서 어쩔 건데요?" 냉정하게 묻는다', affection: -15, trust: -25, type: 'cold' }
                ]
            },
            {
                id: 'comfort_argument',
                situation: '가족과 다퉈서 힘들다고 합니다.',
                choices: [
                    { text: '"어떤 일이 있었는지 얘기하고 싶으면 들어줄게요"', affection: 10, trust: 22, type: 'listening' },
                    { text: '"가족이니까 곧 풀릴 거예요. 너무 걱정마세요"', affection: 8, trust: 18, type: 'reassuring' },
                    { text: '"가족끼리 그럴 수도 있죠 뭐" 무관심하게 반응한다', affection: -10, trust: -20, type: 'indifferent' }
                ]
            },
            {
                id: 'comfort_sick',
                situation: '건강이 안 좋다며 기침을 합니다.',
                choices: [
                    { text: '"병원 가보셨어요? 같이 갈까요?"', affection: 12, trust: 20, type: 'caring' },
                    { text: '"제가 약 사다 드릴게요. 푹 쉬세요"', affection: 14, trust: 22, type: 'helpful' },
                    { text: '"저한테 옮기지 마세요" 거리를 둔다', affection: -18, trust: -25, type: 'selfish' }
                ]
            },
            {
                id: 'comfort_misunderstand',
                situation: '친구에게 오해를 받아서 속상해합니다.',
                choices: [
                    { text: '"분명 오해가 풀릴 거예요. 진실은 밝혀지니까"', affection: 9, trust: 18, type: 'optimistic' },
                    { text: '"제가 친구분께 설명드릴까요?"', affection: 11, trust: 20, type: 'proactive' },
                    { text: '"그 친구가 문제 있는 거 아니에요?" 친구를 비난한다', affection: -8, trust: -15, type: 'negative' }
                ]
            },
            {
                id: 'comfort_insomnia',
                situation: '요즘 잠을 못 자서 힘들다고 합니다.',
                choices: [
                    { text: '"제가 자장가라도 불러드릴까요?" 장난스럽게 위로한다', affection: 10, trust: 15, type: 'playful' },
                    { text: '"걱정되네요. 병원 가보는 게 좋을 것 같아요"', affection: 12, trust: 20, type: 'concerned' },
                    { text: '"그럼 낮에 자지 마세요"', affection: -12, trust: -18, type: 'insensitive' }
                ]
            },
            {
                id: 'comfort_lonely',
                situation: '"요즘 외로워요..."라고 조용히 말합니다.',
                choices: [
                    { text: '손을 꼭 잡으며 "제가 있잖아요"', affection: 15, trust: 25, type: 'romantic' },
                    { text: '"외로울 때마다 연락하세요. 언제든 달려갈게요"', affection: 13, trust: 22, type: 'devoted' },
                    { text: '"친구 만나보세요" 시큰둥하게 답한다', affection: -15, trust: -22, type: 'distant' }
                ]
            },
            {
                id: 'comfort_regret',
                situation: '과거의 실수를 후회한다고 말합니다.',
                choices: [
                    { text: '"과거는 바꿀 수 없어요. 지금부터 잘 하면 돼요"', affection: 10, trust: 18, type: 'forward' },
                    { text: '"누구나 실수하잖아요. 그게 당신의 전부는 아니에요"', affection: 12, trust: 22, type: 'accepting' },
                    { text: '"그러게 그때 왜 그러셨어요" 과거를 들춰낸다', affection: -15, trust: -28, type: 'reproachful' }
                ]
            },
            {
                id: 'comfort_anxiety',
                situation: '"요즘 불안해요. 모든 게 잘 안 될 것 같아요"',
                choices: [
                    { text: '"괜찮아질 거예요!" 무조건 긍정적으로 말한다', affection: 10, trust: -5, type: 'forced_positive' },
                    { text: '"왜 불안한지 천천히 이야기해봐요" 경청한다', affection: 8, trust: 25, type: 'listen' },
                    { text: '"다들 그렇게 살아요" 대수롭지 않게 넘긴다', affection: -15, trust: -20, type: 'dismiss' }
                ]
            },
            {
                id: 'comfort_crying',
                situation: '갑자기 울기 시작합니다. 이유를 말하지 않습니다.',
                choices: [
                    { text: '아무 말 없이 꼭 안아준다', affection: 18, trust: 20, type: 'hug' },
                    { text: '"무슨 일이에요?" 계속 물어본다', affection: -5, trust: 10, type: 'pry' },
                    { text: '"말하고 싶을 때 말해요" 기다려준다', affection: 12, trust: 25, type: 'patient' }
                ]
            },
            {
                id: 'comfort_comparison',
                situation: '"다른 사람들은 다 잘 사는 것 같은데 저만 뒤처진 것 같아요"',
                choices: [
                    { text: '"당신은 충분히 잘하고 있어요" 위로한다', affection: 12, trust: 15, type: 'reassure' },
                    { text: '"비교하지 마세요. 각자의 속도가 있어요"', affection: 10, trust: 22, type: 'perspective' },
                    { text: '"그럼 더 열심히 하면 되죠" 채찍질한다', affection: -18, trust: -15, type: 'push' }
                ]
            },
            {
                id: 'comfort_betrayal',
                situation: '가까운 사람에게 배신당했다며 눈물을 흘립니다.',
                choices: [
                    { text: '"그 사람은 당신을 받을 자격이 없어요" 분노한다', affection: 15, trust: 10, type: 'angry' },
                    { text: '조용히 손을 잡고 옆에 있어준다', affection: 10, trust: 25, type: 'presence' },
                    { text: '"혹시 오해는 아닐까요?" 의심한다', affection: -12, trust: -20, type: 'doubt' }
                ]
            },
            {
                id: 'comfort_nightmare_bad',
                situation: '악몽을 꾸고 놀라 깨어 떨고 있습니다. 새벽 3시입니다.',
                choices: [
                    { text: '즉시 전화를 걸어 위로한다', affection: 20, trust: 22, type: 'immediate' },
                    { text: '메시지로 "괜찮아요. 제가 있어요" 보낸다', affection: 12, trust: 18, type: 'message' },
                    { text: '아침에 확인하고 답장한다', affection: -20, trust: -25, type: 'delay' }
                ]
            },
            {
                id: 'comfort_self_hate',
                situation: '"저는 정말 쓸모없는 사람인 것 같아요..."',
                choices: [
                    { text: '"무슨 소리예요! 당신은 소중한 사람이에요"', affection: 15, trust: 15, type: 'deny' },
                    { text: '"왜 그렇게 생각하는지 말해줄래요?"', affection: 8, trust: 25, type: 'explore' },
                    { text: '"그런 말 하지 마세요. 듣기 힘들어요"', affection: -10, trust: -18, type: 'avoid' }
                ]
            },
            {
                id: 'comfort_overwhelmed',
                situation: '해야 할 일이 너무 많다며 패닉 상태입니다.',
                choices: [
                    { text: '"하나씩 같이 정리해봐요" 실질적으로 돕는다', affection: 12, trust: 25, type: 'practical' },
                    { text: '"다 괜찮아질 거예요. 걱정 마세요"', affection: 10, trust: 10, type: 'vague' },
                    { text: '"계획을 잘 세워야죠" 지적한다', affection: -15, trust: -20, type: 'blame' }
                ]
            },
            {
                id: 'comfort_disappointed',
                situation: '중요한 시험에 떨어졌다며 낙담합니다.',
                choices: [
                    { text: '"이번엔 운이 없었어요. 다음엔 잘 될 거예요"', affection: 10, trust: 15, type: 'encourage' },
                    { text: '"많이 속상하시겠어요. 제가 뭘 도와드릴까요?"', affection: 12, trust: 22, type: 'empathy' },
                    { text: '"왜 떨어졌을까요? 무엇이 부족했나요?"', affection: -18, trust: -15, type: 'analyze' }
                ]
            },
            {
                id: 'comfort_body_image',
                situation: '거울을 보며 "저 정말 못생겼어요..." 라고 말합니다.',
                choices: [
                    { text: '"무슨 소리예요! 정말 예뻐요"', affection: 15, trust: -8, type: 'compliment' },
                    { text: '"외모보다 내면이 더 중요해요"', affection: -5, trust: 15, type: 'inner_beauty' },
                    { text: '"제 눈엔 세상에서 제일 아름다워요"', affection: 18, trust: 12, type: 'romantic' }
                ]
            },
            {
                id: 'comfort_burnout',
                situation: '"더 이상 아무것도 하기 싫어요. 모든 게 의미 없어요"',
                choices: [
                    { text: '"잠깐 쉬어가요. 제가 옆에 있을게요"', affection: 15, trust: 25, type: 'rest' },
                    { text: '"무기력은 일시적이에요. 곧 나아질 거예요"', affection: 8, trust: 12, type: 'temporary' },
                    { text: '"정신 차리세요. 이렇게 있으면 안 돼요"', affection: -20, trust: -25, type: 'harsh' }
                ]
            },
            {
                id: 'comfort_illness',
                situation: '"몸이 아파서 힘들어요..." 기운없이 말합니다.',
                choices: [
                    { text: '"병원 가봐요. 제가 같이 갈게요"', affection: 18, trust: 25, type: 'caring' },
                    { text: '"푹 쉬세요. 제가 필요한 거 다 해드릴게요"', affection: 20, trust: 28, type: 'supportive' },
                    { text: '"약이나 먹고 자세요"', affection: -8, trust: -10, type: 'dismissive' }
                ]
            },
            {
                id: 'comfort_guilt',
                situation: '"제가 잘못한 것 같아요. 죄책감이 들어요"',
                choices: [
                    { text: '"무슨 일이에요? 이야기해봐요"', affection: 12, trust: 28, type: 'listen' },
                    { text: '"당신은 충분히 잘하고 있어요"', affection: 15, trust: 20, type: 'reassure' },
                    { text: '"그럼 사과하세요"', affection: -10, trust: -15, type: 'harsh' }
                ]
            },
            {
                id: 'comfort_deadline',
                situation: '중요한 마감이 다가와 패닉 상태입니다.',
                choices: [
                    { text: '"제가 도울 수 있는 게 있을까요?"', affection: 16, trust: 28, type: 'help' },
                    { text: '"천천히 하나씩 해요. 같이 계획 세워봐요"', affection: 14, trust: 25, type: 'plan' },
                    { text: '"미리미리 했어야죠"', affection: -20, trust: -25, type: 'blame' }
                ]
            },
            {
                id: 'comfort_conflict',
                situation: '친구와 심하게 다퉜다며 울먹입니다.',
                choices: [
                    { text: '아무 말 없이 안아준다', affection: 20, trust: 25, type: 'hug' },
                    { text: '"천천히 이야기해봐요. 뭐가 있었어요?"', affection: 14, trust: 28, type: 'listen' },
                    { text: '"당신이 잘못한 거 아니에요?"', affection: -18, trust: -22, type: 'accusatory' }
                ]
            },
            {
                id: 'comfort_rejection',
                situation: '중요한 지원이나 제안이 거절당했습니다.',
                choices: [
                    { text: '"아쉽지만 더 좋은 기회가 올 거예요"', affection: 14, trust: 22, type: 'hopeful' },
                    { text: '"정말 힘드시겠어요. 제가 옆에 있을게요"', affection: 18, trust: 25, type: 'empathetic' },
                    { text: '"별로 안 맞았나봐요"', affection: -12, trust: -15, type: 'dismissive' }
                ]
            },
            {
                id: 'comfort_embarrassed',
                situation: '사람들 앞에서 창피한 일을 겪었다며 얼굴을 가립니다.',
                choices: [
                    { text: '"괜찮아요. 다들 금방 잊을 거예요"', affection: 14, trust: 20, type: 'reassure' },
                    { text: '"저도 그런 적 많아요. 괜찮아요"', affection: 16, trust: 22, type: 'relate' },
                    { text: '웃으며 "그 얘기 하지 마세요"', affection: -15, trust: -18, type: 'mock' }
                ]
            },
            {
                id: 'comfort_jealous',
                situation: '"다른 사람이 제보다 나은 것 같아요..." 질투심을 드러냅니다.',
                choices: [
                    { text: '"당신은 당신만의 강점이 있어요"', affection: 16, trust: 22, type: 'reassure' },
                    { text: '"비교하지 마세요. 당신은 충분히 멋져요"', affection: 18, trust: 24, type: 'affirm' },
                    { text: '"그럼 더 노력하세요"', affection: -18, trust: -20, type: 'harsh' }
                ]
            },
            {
                id: 'comfort_tired_all_time',
                situation: '"요즘 계속 피곤해요. 아무것도 안 했는데..."',
                choices: [
                    { text: '"병원 가서 검사해봐요. 걱정돼요"', affection: 18, trust: 26, type: 'concerned' },
                    { text: '"쉬는 날 푹 쉬어요. 제가 챙겨드릴게요"', affection: 20, trust: 24, type: 'caring' },
                    { text: '"운동 부족 아니에요?"', affection: -10, trust: -12, type: 'insensitive' }
                ]
            },
            {
                id: 'comfort_memory_loss',
                situation: '"요즘 자꾸 깜빡깜빡해요. 걱정돼요"',
                choices: [
                    { text: '"스트레스 때문일 거예요. 쉬어요"', affection: 14, trust: 20, type: 'reassure' },
                    { text: '"제가 기억 도와드릴게요. 걱정 마세요"', affection: 18, trust: 22, type: 'supportive' },
                    { text: '"저도 그래요" 가볍게 넘긴다', affection: -8, trust: -10, type: 'dismiss' }
                ]
            },
            {
                id: 'comfort_scared_future',
                situation: '"앞으로가 너무 불안해요. 무서워요"',
                choices: [
                    { text: '"제가 함께 있을게요. 같이 헤쳐나가요"', affection: 20, trust: 28, type: 'together' },
                    { text: '"무엇이 제일 걱정되세요?" 경청한다', affection: 14, trust: 26, type: 'listen' },
                    { text: '"다들 그렇게 살아요"', affection: -15, trust: -20, type: 'dismissive' }
                ]
            },
            {
                id: 'comfort_bad_habit',
                situation: '"나쁜 습관을 고치고 싶은데 안 돼요..."',
                choices: [
                    { text: '"제가 도와줄게요. 같이 노력해요"', affection: 18, trust: 26, type: 'help' },
                    { text: '"천천히 하나씩 바꿔가요. 응원할게요"', affection: 16, trust: 24, type: 'encourage' },
                    { text: '"의지가 약한 거죠"', affection: -20, trust: -25, type: 'harsh' }
                ]
            },
            {
                id: 'comfort_weight_gain',
                situation: '"살이 쪄서 옷이 안 맞아요..." 슬퍼합니다.',
                choices: [
                    { text: '"건강이 제일 중요해요. 같이 운동할까요?"', affection: 14, trust: 24, type: 'supportive' },
                    { text: '"그래도 예뻐요. 걱정 마세요"', affection: 16, trust: 18, type: 'reassure' },
                    { text: '"그럼 다이어트 하세요"', affection: -18, trust: -20, type: 'insensitive' }
                ]
            },
            {
                id: 'comfort_regret_choice',
                situation: '"그때 다른 선택을 했어야 했는데..." 후회합니다.',
                choices: [
                    { text: '"그때는 최선의 선택이었을 거예요"', affection: 14, trust: 22, type: 'validate' },
                    { text: '"과거는 바꿀 수 없어요. 지금부터가 중요해요"', affection: 12, trust: 24, type: 'forward' },
                    { text: '"왜 그랬어요?"', affection: -15, trust: -20, type: 'blame' }
                ]
            },
            {
                id: 'comfort_health_scare',
                situation: '건강 검진 결과가 걱정된다며 불안해합니다.',
                choices: [
                    { text: '"함께 병원 갈게요. 걱정 마세요"', affection: 20, trust: 28, type: 'supportive' },
                    { text: '"괜찮을 거예요. 제가 옆에 있어요"', affection: 18, trust: 24, type: 'comfort' },
                    { text: '"긍정적으로 생각하세요"', affection: -8, trust: -10, type: 'dismissive' }
                ]
            },
            {
                id: 'comfort_phone_broken',
                situation: '핸드폰이 고장나서 중요한 데이터를 잃었습니다.',
                choices: [
                    { text: '"같이 복구 방법 찾아봐요"', affection: 16, trust: 24, type: 'help' },
                    { text: '"정말 속상하시겠어요. 제가 위로해드릴게요"', affection: 18, trust: 22, type: 'empathize' },
                    { text: '"백업 안 했어요?"', affection: -15, trust: -18, type: 'blame' }
                ]
            },
            {
                id: 'comfort_misunderstood',
                situation: '"아무도 저를 이해 못 해요..." 외롭다고 합니다.',
                choices: [
                    { text: '"제가 이해할게요. 천천히 이야기해봐요"', affection: 18, trust: 28, type: 'understand' },
                    { text: '조용히 손을 잡고 옆에 있어준다', affection: 20, trust: 26, type: 'presence' },
                    { text: '"너무 예민한 거 아니에요?"', affection: -18, trust: -22, type: 'dismiss' }
                ]
            },
            {
                id: 'comfort_pet_sick',
                situation: '반려동물이 아파서 걱정입니다.',
                choices: [
                    { text: '"같이 동물병원 갈까요?"', affection: 18, trust: 24, type: 'help' },
                    { text: '"걱정 많이 되시겠어요. 괜찮을 거예요"', affection: 16, trust: 22, type: 'comfort' },
                    { text: '"동물이 원래 그래요"', affection: -15, trust: -20, type: 'dismissive' }
                ]
            },
            {
                id: 'comfort_career_doubt',
                situation: '"제가 이 일에 맞는 사람인지 모르겠어요"',
                choices: [
                    { text: '"당신은 잘하고 있어요. 제가 봤어요"', affection: 16, trust: 24, type: 'affirm' },
                    { text: '"왜 그렇게 생각하세요? 이야기해봐요"', affection: 14, trust: 26, type: 'listen' },
                    { text: '"그럼 다른 일 찾아보세요"', affection: -12, trust: -18, type: 'harsh' }
                ]
            },
            {
                id: 'comfort_lonely_night',
                situation: '밤늦게 "외로워요..." 메시지를 보냅니다.',
                choices: [
                    { text: '즉시 전화를 건다', affection: 22, trust: 28, type: 'immediate' },
                    { text: '"제가 있잖아요. 통화할까요?"', affection: 20, trust: 26, type: 'caring' },
                    { text: '"이제 자요. 내일 봐요"', affection: -15, trust: -20, type: 'dismissive' }
                ]
            }
        ]
    },
    future: {
        id: 'future',
        name: '미래 계획',
        icon: '🌟',
        stamina: 22,  // 진지한 미래 대화, 체력 많이 소모
        baseAffection: 3,
        baseTrust: 4,
        description: '앞으로의 계획과 꿈을 이야기합니다',
        minAffection: 40,
        scenarios: [
            {
                id: 'future_dream',
                situation: '결혼에 대한 생각을 물어봅니다.',
                choices: [
                    { text: '"당신과 함께라면 언제든 좋아요"', affection: 15, trust: 30, type: 'romantic' },
                    { text: '"서로 준비되었을 때가 좋겠어요"', affection: 10, trust: 28, type: 'realistic' },
                    { text: '"결혼은... 글쎄요" 회피한다', affection: -15, trust: -25, type: 'avoid' }
                ]
            },
            {
                id: 'future_house',
                situation: '"나중에 어떤 집에서 살고 싶어요?"라고 물어봅니다.',
                choices: [
                    { text: '"당신이 원하는 곳이면 어디든 좋아요"', affection: 12, trust: 25, type: 'flexible' },
                    { text: '구체적인 장소와 이유를 설명한다', affection: 10, trust: 28, type: 'detailed' },
                    { text: '"혼자 사는 게 편한데..." 농담처럼 말한다', affection: -12, trust: -20, type: 'joking_bad' }
                ]
            },
            {
                id: 'future_children',
                situation: '아이에 대한 생각을 물어봅니다.',
                choices: [
                    { text: '"당신을 닮은 아이면 좋겠어요"', affection: 15, trust: 28, type: 'sweet' },
                    { text: '"같이 천천히 생각해봐요"', affection: 10, trust: 25, type: 'thoughtful' },
                    { text: '"아이는 부담스러운데..." 난색을 표한다', affection: -10, trust: -18, type: 'negative' }
                ]
            },
            {
                id: 'future_career',
                situation: '"당신의 커리어 목표는 뭐예요?"',
                choices: [
                    { text: '진지하게 자신의 목표를 설명한다', affection: 10, trust: 25, type: 'serious' },
                    { text: '"당신을 도와주는 게 목표예요" 로맨틱하게 답한다', affection: 13, trust: 20, type: 'romantic' },
                    { text: '"그냥 편하게 살고 싶어요" 의욕 없이 답한다', affection: -8, trust: -15, type: 'unmotivated' }
                ]
            },
            {
                id: 'future_travel',
                situation: '"같이 여행 가고 싶은 곳 있어요?"',
                choices: [
                    { text: '"당신이 가고 싶은 곳이면 다 가고 싶어요"', affection: 12, trust: 22, type: 'agreeable' },
                    { text: '구체적인 장소와 계획을 이야기한다', affection: 14, trust: 25, type: 'planned' },
                    { text: '"여행은 별로예요" 시큰둥하게 답한다', affection: -12, trust: -15, type: 'disinterested' }
                ]
            },
            {
                id: 'future_money',
                situation: '돈과 재산에 대한 생각을 조심스럽게 물어봅니다.',
                choices: [
                    { text: '"같이 열심히 모으면 되죠"', affection: 11, trust: 25, type: 'together' },
                    { text: '"사랑이 있으면 돈은 따라오는 거 아닐까요?"', affection: 9, trust: 18, type: 'idealistic' },
                    { text: '"돈 없으면 사랑도 없죠" 현실적으로 말한다', affection: -15, trust: -20, type: 'materialistic' }
                ]
            },
            {
                id: 'future_parents',
                situation: '부모님을 모시는 것에 대해 물어봅니다.',
                choices: [
                    { text: '"당연히 함께 모셔야죠"', affection: 14, trust: 30, type: 'filial' },
                    { text: '"같이 상의해서 결정해요"', affection: 10, trust: 25, type: 'discussable' },
                    { text: '"그건 좀..." 부담스러워한다', affection: -18, trust: -28, type: 'reluctant' }
                ]
            },
            {
                id: 'future_hobby',
                situation: '"결혼해도 취미 생활 계속하고 싶어요"',
                choices: [
                    { text: '"당연하죠! 저도 지지할게요"', affection: 13, trust: 25, type: 'supportive' },
                    { text: '"저도 함께 하면 안 될까요?"', affection: 11, trust: 22, type: 'joining' },
                    { text: '"결혼하면 그런 거 하기 힘들어요" 부정적으로 답한다', affection: -20, trust: -25, type: 'controlling' }
                ]
            },
            {
                id: 'future_age_gap',
                situation: '나이 차이에 대해 어떻게 생각하는지 묻습니다.',
                choices: [
                    { text: '"사랑에 나이가 무슨 상관이에요"', affection: 14, trust: 20, type: 'accepting' },
                    { text: '"서로를 이해하려고 노력하면 돼요"', affection: 11, trust: 25, type: 'effort' },
                    { text: '"솔직히 좀 신경 쓰이긴 해요"', affection: -10, trust: -15, type: 'concerned' }
                ]
            },
            {
                id: 'future_lifestyle',
                situation: '"당신은 아침형인가요 저녁형인가요?"',
                choices: [
                    { text: '자신의 패턴을 설명하고 맞춰가겠다고 한다', affection: 12, trust: 23, type: 'accommodating' },
                    { text: '"당신한테 맞출게요"', affection: 10, trust: 20, type: 'flexible' },
                    { text: '"전 제 패턴 못 바꿔요" 단호하게 말한다', affection: -12, trust: -18, type: 'inflexible' }
                ]
            },
            {
                id: 'future_sacrifice',
                situation: '"제 커리어 때문에 이사해야 할 수도 있어요. 괜찮을까요?"',
                choices: [
                    { text: '"당신의 꿈을 응원해요. 어디든 따라갈게요"', affection: 18, trust: 25, type: 'supportive' },
                    { text: '"같이 상의해서 결정해요. 제 일도 있으니까"', affection: 8, trust: 28, type: 'realistic' },
                    { text: '"저는 여기서 떠날 수 없어요" 거절한다', affection: -20, trust: -22, type: 'refuse' }
                ]
            },
            {
                id: 'future_debt',
                situation: '"사실 학자금 대출이 좀 남아있어요..." 조심스럽게 고백합니다.',
                choices: [
                    { text: '"같이 갚아나가요. 우리 문제니까"', affection: 20, trust: 30, type: 'together' },
                    { text: '"얼마나 남았어요? 구체적으로 이야기해봐요"', affection: 5, trust: 25, type: 'practical' },
                    { text: '"왜 진작 말 안 했어요?" 따진다', affection: -18, trust: -25, type: 'accuse' }
                ]
            },
            {
                id: 'future_ex_relationship',
                situation: '"전 연인과 좋게 헤어져서 가끔 연락해요. 괜찮죠?"',
                choices: [
                    { text: '"믿어요. 당신 판단을 존중해요"', affection: 12, trust: 30, type: 'trust' },
                    { text: '"솔직히... 좀 불편한데 솔직하게 말해줘서 고마워요"', affection: 8, trust: 25, type: 'honest' },
                    { text: '"그건 좀 아닌 것 같은데요" 불쾌감을 드러낸다', affection: -15, trust: -20, type: 'uncomfortable' }
                ]
            },
            {
                id: 'future_religion',
                situation: '종교에 대한 생각이 다르다는 것을 알게 됩니다.',
                choices: [
                    { text: '"서로 존중하면 문제없어요"', affection: 15, trust: 28, type: 'respectful' },
                    { text: '"제 종교로 개종해주면 안 될까요?"', affection: -10, trust: -15, type: 'convert' },
                    { text: '"이건 중요한 문제네요. 깊이 이야기해봐요"', affection: 10, trust: 25, type: 'serious_talk' }
                ]
            },
            {
                id: 'future_work_life',
                situation: '"일과 가정 중 뭐가 더 중요해요?"라고 물어봅니다.',
                choices: [
                    { text: '"가정이 우선이죠. 당신이 제일 중요해요"', affection: 18, trust: 15, type: 'family_first' },
                    { text: '"둘 다 중요해요. 균형을 맞춰야죠"', affection: 10, trust: 28, type: 'balanced' },
                    { text: '"일 없이는 가정도 없어요" 현실적으로 답한다', affection: -8, trust: 20, type: 'work_focused' }
                ]
            },
            {
                id: 'future_emergency',
                situation: '"제 가족이 갑자기 큰 돈이 필요하다면 도와줄 수 있어요?"',
                choices: [
                    { text: '"당연하죠. 가족인데요"', affection: 20, trust: 28, type: 'family' },
                    { text: '"상황을 보고 최선을 다해 도와드릴게요"', affection: 12, trust: 25, type: 'conditional' },
                    { text: '"그건... 좀 부담스러운데요"', affection: -15, trust: -20, type: 'burden' }
                ]
            },
            {
                id: 'future_health',
                situation: '"만약 제가 심하게 아프면... 그래도 함께 있어줄 수 있어요?"',
                choices: [
                    { text: '손을 꼭 잡으며 "평생 함께할게요"', affection: 25, trust: 30, type: 'devoted' },
                    { text: '"무슨 소리예요. 당연하죠"', affection: 20, trust: 28, type: 'reassure' },
                    { text: '"그런 일 없을 거예요" 주제를 회피한다', affection: -12, trust: -25, type: 'avoid' }
                ]
            },
            {
                id: 'future_friends',
                situation: '"결혼해도 친구들 자주 만나고 싶어요"',
                choices: [
                    { text: '"당연하죠! 저도 당신 친구들이랑 친해지고 싶어요"', affection: 15, trust: 25, type: 'supportive' },
                    { text: '"적당히는 괜찮아요"', affection: 8, trust: 18, type: 'moderate' },
                    { text: '"결혼하면 가족이 우선 아니에요?"', affection: -18, trust: -25, type: 'controlling' }
                ]
            },
            {
                id: 'future_past_mistakes',
                situation: '"과거에 실수가 많았어요. 그래도 받아들여줄 수 있어요?"',
                choices: [
                    { text: '"과거는 과거예요. 지금의 당신이 중요해요"', affection: 20, trust: 28, type: 'accepting' },
                    { text: '"어떤 실수였는지 말해줄 수 있어요?"', affection: 5, trust: 25, type: 'curious' },
                    { text: '"그게 무슨 실수인데요?" 불안해한다', affection: -10, trust: -15, type: 'anxious' }
                ]
            },
            {
                id: 'future_retirement',
                situation: '"노후는 어떻게 보내고 싶어요?"',
                choices: [
                    { text: '"당신이랑 조용한 시골에서 살고 싶어요"', affection: 18, trust: 22, type: 'peaceful' },
                    { text: '"건강하게 취미 생활하면서 보내고 싶어요"', affection: 12, trust: 25, type: 'active' },
                    { text: '"아직 그런 건 생각 안 해봤어요" 무관심하게 답한다', affection: -8, trust: -12, type: 'indifferent' }
                ]
            },
            {
                id: 'future_house_design',
                situation: '"우리 집은 어떤 스타일로 꾸미고 싶어요?"',
                choices: [
                    { text: '"당신 취향대로 해요. 당신이 좋으면 저도 좋아요"', affection: 16, trust: 24, type: 'flexible' },
                    { text: '"같이 하나하나 고르는 재미가 있을 거예요"', affection: 18, trust: 26, type: 'together' },
                    { text: '"그런 건 중요하지 않아요"', affection: -10, trust: -15, type: 'dismissive' }
                ]
            },
            {
                id: 'future_anniversary',
                situation: '"결혼기념일은 어떻게 보내고 싶어요?"',
                choices: [
                    { text: '"매년 특별하게 챙기고 싶어요"', affection: 20, trust: 24, type: 'romantic' },
                    { text: '"소박하게 둘이서 조용히 보내고 싶어요"', affection: 16, trust: 26, type: 'simple' },
                    { text: '"그냥 평범한 날처럼 지내면 안 돼요?"', affection: -15, trust: -20, type: 'indifferent' }
                ]
            },
            {
                id: 'future_pet_plan',
                situation: '"결혼하면 반려동물 키울까요?"',
                choices: [
                    { text: '"좋아요! 어떤 동물 키우고 싶어요?"', affection: 18, trust: 22, type: 'enthusiastic' },
                    { text: '"책임감 있게 키울 수 있다면요"', affection: 12, trust: 28, type: 'responsible' },
                    { text: '"동물은 번거로워요"', affection: -12, trust: -18, type: 'negative' }
                ]
            },
            {
                id: 'future_vacation',
                situation: '"신혼여행은 어디로 가고 싶어요?"',
                choices: [
                    { text: '꿈의 여행지를 구체적으로 제안한다', affection: 18, trust: 24, type: 'planned' },
                    { text: '"당신이 가고 싶은 곳이면 어디든 좋아요"', affection: 16, trust: 22, type: 'agreeable' },
                    { text: '"돈이 많이 들 텐데요"', affection: -15, trust: -20, type: 'cheap' }
                ]
            },
            {
                id: 'future_cooking',
                situation: '"집에서 요리는 누가 할까요?"',
                choices: [
                    { text: '"제가 배워서 할게요"', affection: 20, trust: 26, type: 'willing' },
                    { text: '"같이 하면 재미있을 것 같아요"', affection: 18, trust: 28, type: 'together' },
                    { text: '"당신이 더 잘하잖아요"', affection: -10, trust: -15, type: 'lazy' }
                ]
            },
            {
                id: 'future_education',
                situation: '"아이 교육은 어떻게 하고 싶어요?"',
                choices: [
                    { text: '"자유롭게 키우되 가치관은 잘 가르치고 싶어요"', affection: 16, trust: 28, type: 'balanced' },
                    { text: '"같이 상의하면서 결정해요"', affection: 14, trust: 26, type: 'discuss' },
                    { text: '"그건 나중에 생각해요"', affection: -8, trust: -12, type: 'avoid' }
                ]
            },
            {
                id: 'future_fighting',
                situation: '"우리가 싸우면 어떻게 할까요?"',
                choices: [
                    { text: '"그날 안에 꼭 화해하고 싶어요"', affection: 18, trust: 28, type: 'resolve' },
                    { text: '"서로 감정 정리 후에 대화해요"', affection: 14, trust: 26, type: 'mature' },
                    { text: '"안 싸우면 되죠"', affection: -10, trust: -15, type: 'naive' }
                ]
            },
            {
                id: 'future_in_laws',
                situation: '"시댁/처가 방문은 얼마나 자주 할까요?"',
                choices: [
                    { text: '"자주 뵙고 싶어요. 가족이니까요"', affection: 16, trust: 28, type: 'family' },
                    { text: '"적당히 균형있게 하면 좋겠어요"', affection: 14, trust: 26, type: 'balanced' },
                    { text: '"가끔만 가도 되죠"', affection: -12, trust: -20, type: 'distant' }
                ]
            },
            {
                id: 'future_space',
                situation: '"혼자만의 시간도 필요할까요?"',
                choices: [
                    { text: '"당연하죠. 서로 존중해줘야죠"', affection: 14, trust: 28, type: 'respectful' },
                    { text: '"가끔은 필요하지만 항상 같이 있고 싶어요"', affection: 18, trust: 24, type: 'clingy' },
                    { text: '"왜요? 제가 싫어요?"', affection: -15, trust: -18, type: 'insecure' }
                ]
            },
            {
                id: 'future_tradition',
                situation: '"명절에는 어디서 보낼까요?"',
                choices: [
                    { text: '"번갈아가며 공평하게 하면 좋겠어요"', affection: 14, trust: 28, type: 'fair' },
                    { text: '"같이 상의해서 결정해요"', affection: 16, trust: 26, type: 'discuss' },
                    { text: '"저희끼리만 보내면 안 돼요?"', affection: -12, trust: -22, type: 'avoid' }
                ]
            },
            {
                id: 'future_bucket_list',
                situation: '"같이 꼭 하고 싶은 게 있어요?"',
                choices: [
                    { text: '구체적인 버킷리스트를 이야기한다', affection: 18, trust: 24, type: 'specific' },
                    { text: '"당신과 함께하는 모든 순간이 소중해요"', affection: 20, trust: 22, type: 'romantic' },
                    { text: '"특별히 없는데요"', affection: -8, trust: -12, type: 'indifferent' }
                ]
            },
            {
                id: 'future_sharing',
                situation: '"돈은 어떻게 관리할까요?"',
                choices: [
                    { text: '"투명하게 같이 관리하면 좋겠어요"', affection: 14, trust: 30, type: 'transparent' },
                    { text: '"공동 계좌 만들어서 함께 써요"', affection: 16, trust: 28, type: 'joint' },
                    { text: '"각자 쓰는 게 편할 것 같은데요"', affection: -10, trust: -15, type: 'separate' }
                ]
            },
            {
                id: 'future_sickness',
                situation: '"나이 들어서 아프면 요양원 갈까요?"',
                choices: [
                    { text: '"절대 안 돼요. 끝까지 같이 있을 거예요"', affection: 22, trust: 28, type: 'devoted' },
                    { text: '"상황 봐서 최선을 다할게요"', affection: 14, trust: 26, type: 'realistic' },
                    { text: '"그건 너무 먼 미래 아니에요?"', affection: -10, trust: -15, type: 'avoid' }
                ]
            },
            {
                id: 'future_name',
                situation: '"아이 이름은 어떻게 지을까요?"',
                choices: [
                    { text: '"의미 있는 이름으로 같이 고민해요"', affection: 18, trust: 26, type: 'thoughtful' },
                    { text: '"당신이 좋아하는 이름으로 해요"', affection: 16, trust: 24, type: 'defer' },
                    { text: '"그런 건 아직 멀었어요"', affection: -8, trust: -12, type: 'avoid' }
                ]
            },
            {
                id: 'future_relocation',
                situation: '"해외 이주 기회가 생긴다면?"',
                choices: [
                    { text: '"당신과 함께라면 어디든 좋아요"', affection: 20, trust: 26, type: 'supportive' },
                    { text: '"신중하게 같이 결정해요"', affection: 14, trust: 28, type: 'careful' },
                    { text: '"저는 이곳을 떠나고 싶지 않아요"', affection: -12, trust: -18, type: 'resistant' }
                ]
            },
            {
                id: 'future_wedding',
                situation: '"결혼식은 크게 할까요, 작게 할까요?"',
                choices: [
                    { text: '"당신 의견에 맞출게요"', affection: 16, trust: 24, type: 'flexible' },
                    { text: '"의미있게 우리답게 하면 좋겠어요"', affection: 18, trust: 26, type: 'meaningful' },
                    { text: '"돈 아까우니까 작게 해요"', affection: -12, trust: -15, type: 'cheap' }
                ]
            },
            {
                id: 'future_aging',
                situation: '"나이 들면 외모가 변할 텐데 괜찮아요?"',
                choices: [
                    { text: '"사랑은 외모가 아니잖아요. 걱정 마세요"', affection: 20, trust: 28, type: 'reassuring' },
                    { text: '"같이 나이 들어가는 거잖아요"', affection: 18, trust: 26, type: 'together' },
                    { text: '"그건 좀..." 망설인다', affection: -20, trust: -25, type: 'shallow' }
                ]
            },
            {
                id: 'future_hobby_together',
                situation: '"같이 할 수 있는 취미를 만들까요?"',
                choices: [
                    { text: '"좋아요! 뭐가 좋을까요?"', affection: 18, trust: 24, type: 'enthusiastic' },
                    { text: '"각자 취미도 존중하면서 공통 취미도 만들어요"', affection: 16, trust: 28, type: 'balanced' },
                    { text: '"굳이 같이 안 해도 되지 않나요?"', affection: -12, trust: -16, type: 'distant' }
                ]
            },
            {
                id: 'future_privacy',
                situation: '"스마트폰 비밀번호 공유할까요?"',
                choices: [
                    { text: '"신뢰의 표시로 공유해요"', affection: 18, trust: 26, type: 'trust' },
                    { text: '"서로 프라이버시는 존중하는 게 좋을 것 같아요"', affection: 12, trust: 28, type: 'privacy' },
                    { text: '"왜요? 숨길 게 있어요?"', affection: -15, trust: -22, type: 'suspicious' }
                ]
            }
        ]
    },
    humor: {
        id: 'humor',
        name: '농담/유머',
        icon: '😄',
        stamina: 12,  // 가벼운 유머, 중간 수준
        baseAffection: 3,  // 대폭 감소 (8 → 3)
        baseTrust: 1,  // 대폭 감소 (3 → 1)
        description: '즐거운 농담으로 분위기를 띄웁니다',
        random: true,
        successRate: 0.7,
        scenarios: [
            {
                id: 'humor_joke',
                situation: '재밌는 농담을 하려고 합니다.',
                choices: [
                    { text: '아재개그를 시전한다', affection: 15, trust: 10, type: 'dad_joke', successRate: 0.5 },
                    { text: '최근 유행하는 밈을 사용한다', affection: 12, trust: 12, type: 'meme', successRate: 0.7 },
                    { text: '가벼운 장난을 친다', affection: 10, trust: 15, type: 'playful', successRate: 0.8 },
                    { text: '심각한 얼굴로 시답잖은 농담을 한다', affection: -8, trust: -5, type: 'bad_timing', successRate: 0.3 }
                ]
            },
            {
                id: 'humor_tease',
                situation: '상대방을 살짝 놀리고 싶습니다.',
                choices: [
                    { text: '귀여운 별명을 지어준다', affection: 13, trust: 12, type: 'nickname', successRate: 0.7 },
                    { text: '장난스럽게 웃으며 놀린다', affection: 12, trust: 15, type: 'tease', successRate: 0.6 },
                    { text: '재미있었던 에피소드를 언급한다', affection: 10, trust: 18, type: 'story', successRate: 0.8 },
                    { text: '민감한 부분을 놀려서 분위기를 망친다', affection: -12, trust: -10, type: 'insensitive', successRate: 0.4 }
                ]
            },
            {
                id: 'humor_imitate',
                situation: '상대방의 말투를 흉내내고 싶습니다.',
                choices: [
                    { text: '귀엽게 따라한다', affection: 15, trust: 10, type: 'cute', successRate: 0.6 },
                    { text: '과장되게 웃기게 따라한다', affection: 12, trust: 8, type: 'exaggerate', successRate: 0.5 },
                    { text: '살짝만 흉내내고 웃는다', affection: 10, trust: 15, type: 'gentle', successRate: 0.8 },
                    { text: '무시하는 듯한 말투로 따라하다 화나게 만든다', affection: -15, trust: -12, type: 'mocking', successRate: 0.2 }
                ]
            },
            {
                id: 'humor_selfie',
                situation: '"같이 셀카 찍을까요?" 장난스럽게 제안합니다.',
                choices: [
                    { text: '밝게 웃으며 포즈를 취한다', affection: 12, trust: 10, type: 'enthusiastic', successRate: 0.8 },
                    { text: '익살스러운 표정을 지어 웃긴다', affection: 14, trust: 8, type: 'funny_face', successRate: 0.7 },
                    { text: '"제가 잘 안 나와서..." 거절한다', affection: -8, trust: -5, type: 'reject', successRate: 0.6 },
                    { text: '시큰둥하게 "에이, 나중에요"라고 넘긴다', affection: -10, trust: -8, type: 'dismissive', successRate: 0.5 }
                ]
            },
            {
                id: 'humor_game',
                situation: '심심해서 간단한 게임을 하자고 제안합니다.',
                choices: [
                    { text: '"좋아요! 뭐 할까요?"라고 신나게 응한다', affection: 13, trust: 12, type: 'excited', successRate: 0.8 },
                    { text: '이기려고 노력하며 진지하게 임한다', affection: 10, trust: 8, type: 'competitive', successRate: 0.7 },
                    { text: '일부러 져주면서 배려한다', affection: 11, trust: 15, type: 'considerate', successRate: 0.7 },
                    { text: '"유치한데요" 참여를 거부한다', affection: -12, trust: -10, type: 'refuse', successRate: 0.4 }
                ]
            },
            {
                id: 'humor_tickle',
                situation: '장난스럽게 간지럼을 태우려고 합니다.',
                choices: [
                    { text: '살짝만 간지럼 태우며 웃긴다', affection: 13, trust: 10, type: 'gentle_tickle', successRate: 0.7 },
                    { text: '간지럼 태우는 척만 하고 웃는다', affection: 10, trust: 12, type: 'pretend', successRate: 0.8 },
                    { text: '갑자기 세게 간지럼 태워서 화나게 만든다', affection: -10, trust: -8, type: 'too_much', successRate: 0.4 },
                    { text: '거리낌 없이 계속 간지럼 태워 불편하게 만든다', affection: -15, trust: -12, type: 'excessive', successRate: 0.3 }
                ]
            },
            {
                id: 'humor_prank',
                situation: '가벼운 장난을 치고 싶습니다.',
                choices: [
                    { text: '귀여운 깜짝 놀라게 하기를 시도한다', affection: 12, trust: 8, type: 'surprise', successRate: 0.7 },
                    { text: '재미있는 음성 변조 앱으로 웃긴다', affection: 11, trust: 10, type: 'voice_app', successRate: 0.7 },
                    { text: '소소한 거짓말로 장난친 뒤 바로 털어놓는다', affection: 9, trust: 12, type: 'white_lie', successRate: 0.6 },
                    { text: '과한 장난으로 진짜 화나게 만든다', affection: -15, trust: -18, type: 'mean_prank', successRate: 0.3 }
                ]
            },
            {
                id: 'humor_food',
                situation: '먹는 모습이 귀엽다고 놀립니다.',
                choices: [
                    { text: '"정말 귀엽게 드시네요" 웃으며 말한다', affection: 11, trust: 10, type: 'cute_compliment', successRate: 0.7 },
                    { text: '먹는 모습을 흉내내며 웃긴다', affection: 13, trust: 8, type: 'imitate_eating', successRate: 0.6 },
                    { text: '계속 쳐다보며 민망하게 만든다', affection: -8, trust: -10, type: 'stare', successRate: 0.4 },
                    { text: '"그렇게 먹으면 안 되죠" 비판한다', affection: -18, trust: -15, type: 'criticize', successRate: 0.2 }
                ]
            },
            {
                id: 'humor_dance',
                situation: '갑자기 음악이 나오자 춤을 추자고 합니다.',
                choices: [
                    { text: '부끄러워하면서도 같이 춤춘다', affection: 15, trust: 12, type: 'shy_dance', successRate: 0.7 },
                    { text: '신나게 춤추며 분위기를 띄운다', affection: 14, trust: 10, type: 'enthusiastic_dance', successRate: 0.8 },
                    { text: '박수 치며 응원만 한다', affection: 8, trust: 8, type: 'cheer', successRate: 0.7 },
                    { text: '"창피해요" 손사래 치며 거절한다', affection: -10, trust: -8, type: 'embarrassed_reject', successRate: 0.5 }
                ]
            },
            {
                id: 'humor_mistake',
                situation: '말을 하다가 실수로 웃긴 표현을 씁니다.',
                choices: [
                    { text: '같이 웃으며 "귀여운데요?"', affection: 12, trust: 10, type: 'laugh_together', successRate: 0.8 },
                    { text: '실수한 표현을 따라하며 놀린다', affection: 10, trust: 8, type: 'tease_mistake', successRate: 0.6 },
                    { text: '모른 척하며 넘어간다', affection: 7, trust: 12, type: 'ignore_politely', successRate: 0.8 },
                    { text: '계속 그 실수를 언급하며 창피하게 만든다', affection: -12, trust: -15, type: 'keep_mentioning', successRate: 0.3 }
                ]
            },
            {
                id: 'humor_aegyo',
                situation: '상대방이 애교를 부리며 뭔가를 부탁합니다.',
                choices: [
                    { text: '"너무 귀여운데요?" 웃으며 들어준다', affection: 15, trust: 12, type: 'accept_cute', successRate: 0.8 },
                    { text: '"그만 하세요" 웃으며 장난스럽게 거절한다', affection: 10, trust: 10, type: 'playful_reject', successRate: 0.7 },
                    { text: '같이 애교 부리며 맞받아친다', affection: 14, trust: 8, type: 'mirror_aegyo', successRate: 0.6 },
                    { text: '"징그러워요" 진지하게 거부한다', affection: -18, trust: -15, type: 'disgusted', successRate: 0.2 }
                ]
            },
            {
                id: 'humor_voice',
                situation: '상대방의 목소리가 감기 때문에 쉬어서 웃깁니다.',
                choices: [
                    { text: '"목소리 귀여운데요?" 웃으며 위로한다', affection: 12, trust: 15, type: 'cute_voice', successRate: 0.8 },
                    { text: '쉰 목소리를 흉내내며 같이 웃는다', affection: 10, trust: 8, type: 'imitate_voice', successRate: 0.6 },
                    { text: '약을 사다주겠다고 진지하게 말한다', affection: 11, trust: 20, type: 'caring', successRate: 0.8 },
                    { text: '계속 놀리며 말을 시킨다', affection: -15, trust: -12, type: 'mean_tease', successRate: 0.3 }
                ]
            },
            {
                id: 'humor_surprise',
                situation: '깜짝 선물로 장난감 같은 걸 준비했습니다.',
                choices: [
                    { text: '신나게 좋아하며 같이 논다', affection: 16, trust: 12, type: 'enthusiastic', successRate: 0.8 },
                    { text: '"유치한데 좋네요" 웃으며 받는다', affection: 12, trust: 10, type: 'amused', successRate: 0.7 },
                    { text: '"이게 뭐예요?" 당황한다', affection: -5, trust: 5, type: 'confused', successRate: 0.6 },
                    { text: '"이런 거 싫어요" 냉담하게 거절한다', affection: -20, trust: -18, type: 'cold_reject', successRate: 0.2 }
                ]
            },
            {
                id: 'humor_nickname_fail',
                situation: '상대방이 지어준 별명이 별로입니다.',
                choices: [
                    { text: '"귀여운데요?" 웃으며 받아들인다', affection: 15, trust: 18, type: 'accept', successRate: 0.8 },
                    { text: '"다른 걸로 해주세요" 장난스럽게 거절한다', affection: 10, trust: 12, type: 'playful_reject', successRate: 0.7 },
                    { text: '더 웃긴 별명으로 맞받아친다', affection: 13, trust: 10, type: 'counter', successRate: 0.6 },
                    { text: '"정말 싫은데요" 진지하게 화낸다', affection: -12, trust: -10, type: 'angry', successRate: 0.4 }
                ]
            },
            {
                id: 'humor_photobomb',
                situation: '사진 찍으려는 순간 웃긴 표정으로 방해합니다.',
                choices: [
                    { text: '같이 웃으며 다시 찍는다', affection: 14, trust: 12, type: 'laugh_together', successRate: 0.8 },
                    { text: '"진지하게 찍어요!" 웃으며 혼낸다', affection: 11, trust: 10, type: 'playful_scold', successRate: 0.7 },
                    { text: '더 웃긴 표정으로 같이 장난친다', affection: 15, trust: 8, type: 'join_fun', successRate: 0.7 },
                    { text: '"사진 망쳤잖아요" 짜증낸다', affection: -15, trust: -12, type: 'annoyed', successRate: 0.3 }
                ]
            },
            {
                id: 'humor_snort',
                situation: '웃다가 코웃음을 쳐서 당황합니다.',
                choices: [
                    { text: '"그것도 귀여운데요?" 웃으며 위로한다', affection: 13, trust: 15, type: 'cute', successRate: 0.8 },
                    { text: '같이 웃으며 "인간적이네요"', affection: 11, trust: 18, type: 'human', successRate: 0.8 },
                    { text: '모른 척 넘어간다', affection: 8, trust: 12, type: 'ignore', successRate: 0.7 },
                    { text: '흉내내며 놀린다', affection: -10, trust: -8, type: 'mock', successRate: 0.4 }
                ]
            },
            {
                id: 'humor_bad_joke',
                situation: '당신이 한 농담이 완전히 실패했습니다.',
                choices: [
                    { text: '"미안해요" 웃으며 인정한다', affection: 10, trust: 15, type: 'admit', successRate: 0.8 },
                    { text: '더 웃긴 농담으로 만회한다', affection: 13, trust: 10, type: 'recover', successRate: 0.6 },
                    { text: '"원래 제 개그 센스가..." 변명한다', affection: 8, trust: 8, type: 'excuse', successRate: 0.7 },
                    { text: '억지로 웃기려고 계속 시도한다', affection: -8, trust: -10, type: 'force', successRate: 0.4 }
                ]
            },
            {
                id: 'humor_sleepy',
                situation: '상대방이 졸린 모습이 너무 귀엽습니다.',
                choices: [
                    { text: '"푹 쉬세요" 조용히 잠들게 해준다', affection: 12, trust: 20, type: 'caring', successRate: 0.8 },
                    { text: '졸린 모습을 살짝 놀리며 웃긴다', affection: 10, trust: 12, type: 'tease', successRate: 0.7 },
                    { text: '사진을 살짝 찍는다', affection: 8, trust: 5, type: 'photo', successRate: 0.6 },
                    { text: '"자면 안 돼요!" 계속 깨운다', affection: -12, trust: -15, type: 'prevent_sleep', successRate: 0.3 }
                ]
            },
            {
                id: 'humor_awkward_silence',
                situation: '갑자기 어색한 침묵이 흐릅니다.',
                choices: [
                    { text: '재밌는 주제를 꺼내 분위기를 바꾼다', affection: 12, trust: 15, type: 'change_topic', successRate: 0.8 },
                    { text: '"어색하네요" 솔직하게 말하며 웃는다', affection: 10, trust: 18, type: 'honest', successRate: 0.7 },
                    { text: '손을 잡으며 미소짓는다', affection: 15, trust: 12, type: 'romantic', successRate: 0.7 },
                    { text: '계속 침묵을 유지하며 불편해한다', affection: -10, trust: -12, type: 'silent', successRate: 0.4 }
                ]
            },
            {
                id: 'humor_height',
                situation: '키 차이에 대해 장난스럽게 이야기합니다.',
                choices: [
                    { text: '"키 차이 귀엽지 않아요?" 웃으며 말한다', affection: 16, trust: 14, type: 'cute', successRate: 0.8 },
                    { text: '까치발을 들거나 몸을 낮추며 맞춰본다', affection: 18, trust: 12, type: 'playful', successRate: 0.7 },
                    { text: '"완벽한 조합이에요"', affection: 14, trust: 14, type: 'compliment', successRate: 0.8 },
                    { text: '"키 작아서/커서 불편하죠?"', affection: -12, trust: -15, type: 'insensitive', successRate: 0.3 }
                ]
            },
            {
                id: 'humor_accent',
                situation: '말투나 사투리가 귀엽습니다.',
                choices: [
                    { text: '"그거 정말 귀여운데요?" 칭찬한다', affection: 16, trust: 14, type: 'compliment', successRate: 0.8 },
                    { text: '살짝 따라하며 장난친다', affection: 14, trust: 12, type: 'tease', successRate: 0.6 },
                    { text: '재미있어하며 듣는다', affection: 12, trust: 14, type: 'enjoy', successRate: 0.8 },
                    { text: '"표준어 써요" 지적한다', affection: -15, trust: -18, type: 'critical', successRate: 0.2 }
                ]
            },
            {
                id: 'humor_mimic_celebrity',
                situation: '연예인 성대모사를 시도합니다.',
                choices: [
                    { text: '박수치며 "잘하시는데요!" 칭찬한다', affection: 16, trust: 12, type: 'applaud', successRate: 0.8 },
                    { text: '같이 다른 연예인 흉내내며 논다', affection: 18, trust: 14, type: 'join', successRate: 0.7 },
                    { text: '"아슬아슬한데요?" 웃으며 평가한다', affection: 12, trust: 14, type: 'honest', successRate: 0.6 },
                    { text: '"안 닮았는데요"', affection: -12, trust: -10, type: 'harsh', successRate: 0.4 }
                ]
            },
            {
                id: 'humor_animal_sound',
                situation: '동물 소리를 내며 장난칩니다.',
                choices: [
                    { text: '같이 다른 동물 소리를 낸다', affection: 18, trust: 12, type: 'playful', successRate: 0.8 },
                    { text: '"귀엽네요" 웃으며 즐긴다', affection: 16, trust: 14, type: 'cute', successRate: 0.8 },
                    { text: '영상으로 찍자고 한다', affection: 14, trust: 12, type: 'record', successRate: 0.6 },
                    { text: '"유치해요"', affection: -15, trust: -16, type: 'dismissive', successRate: 0.3 }
                ]
            },
            {
                id: 'humor_funny_face',
                situation: '거울 앞에서 웃긴 표정을 짓습니다.',
                choices: [
                    { text: '같이 더 웃긴 표정을 지어 경쟁한다', affection: 18, trust: 14, type: 'compete', successRate: 0.7 },
                    { text: '사진으로 찍어준다', affection: 14, trust: 12, type: 'photo', successRate: 0.8 },
                    { text: '"귀엽네요" 웃는다', affection: 16, trust: 14, type: 'cute', successRate: 0.8 },
                    { text: '"이상해요"', affection: -10, trust: -12, type: 'weird', successRate: 0.4 }
                ]
            },
            {
                id: 'humor_rap',
                situation: '갑자기 랩을 하기 시작합니다.',
                choices: [
                    { text: '박수치며 비트를 만들어준다', affection: 18, trust: 14, type: 'beatbox', successRate: 0.7 },
                    { text: '"오 좋은데요?" 호응한다', affection: 16, trust: 12, type: 'encourage', successRate: 0.8 },
                    { text: '같이 랩배틀을 한다', affection: 20, trust: 12, type: 'battle', successRate: 0.6 },
                    { text: '"조용히 해요"', affection: -15, trust: -18, type: 'stop', successRate: 0.3 }
                ]
            },
            {
                id: 'humor_magic_trick',
                situation: '간단한 마술 트릭을 보여줍니다.',
                choices: [
                    { text: '"어떻게 한 거예요?" 신기해한다', affection: 16, trust: 14, type: 'amazed', successRate: 0.8 },
                    { text: '"대단한데요!" 박수친다', affection: 18, trust: 12, type: 'applaud', successRate: 0.8 },
                    { text: '"트릭 알려주세요"', affection: 14, trust: 14, type: 'curious', successRate: 0.7 },
                    { text: '"별로 안 신기한데요"', affection: -12, trust: -15, type: 'unimpressed', successRate: 0.3 }
                ]
            },
            {
                id: 'humor_tongue_twister',
                situation: '빨리 말하기나 어려운 발음을 시도합니다.',
                choices: [
                    { text: '같이 도전해본다', affection: 18, trust: 14, type: 'join', successRate: 0.7 },
                    { text: '실패하는 모습에 웃으며 즐긴다', affection: 16, trust: 12, type: 'laugh', successRate: 0.8 },
                    { text: '"잘하시네요!"', affection: 14, trust: 14, type: 'compliment', successRate: 0.8 },
                    { text: '"왜 그런 걸 해요?"', affection: -10, trust: -12, type: 'question', successRate: 0.4 }
                ]
            },
            {
                id: 'humor_shadow_puppet',
                situation: '손그림자로 동물을 만듭니다.',
                choices: [
                    { text: '같이 다른 동물을 만든다', affection: 18, trust: 14, type: 'join', successRate: 0.7 },
                    { text: '"신기하네요!" 감탄한다', affection: 16, trust: 12, type: 'impressed', successRate: 0.8 },
                    { text: '어떻게 하는지 가르쳐달라고 한다', affection: 14, trust: 16, type: 'learn', successRate: 0.8 },
                    { text: '"유치해요"', affection: -12, trust: -14, type: 'childish', successRate: 0.3 }
                ]
            },
            {
                id: 'humor_riddle',
                situation: '수수께끼를 냅니다.',
                choices: [
                    { text: '진지하게 생각해서 맞춰본다', affection: 16, trust: 14, type: 'serious', successRate: 0.8 },
                    { text: '"모르겠어요, 뭐예요?" 궁금해한다', affection: 14, trust: 12, type: 'curious', successRate: 0.7 },
                    { text: '엉뚱한 답으로 웃긴다', affection: 18, trust: 12, type: 'funny_answer', successRate: 0.6 },
                    { text: '"수수께끼 싫어요"', affection: -10, trust: -12, type: 'dislike', successRate: 0.4 }
                ]
            },
            {
                id: 'humor_sing_wrong',
                situation: '노래를 일부러 이상하게 부릅니다.',
                choices: [
                    { text: '같이 이상하게 불러 호응한다', affection: 20, trust: 14, type: 'join', successRate: 0.7 },
                    { text: '웃으며 "제대로 불러요"', affection: 16, trust: 12, type: 'laugh', successRate: 0.8 },
                    { text: '"귀여워요" 즐긴다', affection: 18, trust: 14, type: 'cute', successRate: 0.8 },
                    { text: '"듣기 싫어요"', affection: -15, trust: -16, type: 'annoyed', successRate: 0.3 }
                ]
            },
            {
                id: 'humor_walk_funny',
                situation: '이상한 걸음걸이로 걷습니다.',
                choices: [
                    { text: '같이 웃긴 걸음으로 따라간다', affection: 20, trust: 12, type: 'join', successRate: 0.7 },
                    { text: '웃으며 "뭐 하는 거예요?"', affection: 16, trust: 14, type: 'laugh', successRate: 0.8 },
                    { text: '영상을 찍는다', affection: 14, trust: 12, type: 'record', successRate: 0.6 },
                    { text: '"창피해요, 그만해요"', affection: -12, trust: -14, type: 'embarrassed', successRate: 0.4 }
                ]
            },
            {
                id: 'humor_silly_question',
                situation: '황당한 질문을 합니다.',
                choices: [
                    { text: '진지하게 대답해준다', affection: 16, trust: 16, type: 'serious', successRate: 0.8 },
                    { text: '더 황당한 질문으로 맞받아친다', affection: 18, trust: 14, type: 'counter', successRate: 0.7 },
                    { text: '"재미있는 질문이네요" 웃는다', affection: 14, trust: 14, type: 'amused', successRate: 0.8 },
                    { text: '"이상한 질문 하지 마세요"', affection: -10, trust: -12, type: 'dismiss', successRate: 0.4 }
                ]
            },
            {
                id: 'humor_pretend_robot',
                situation: '로봇 흉내를 냅니다.',
                choices: [
                    { text: '같이 로봇이 되어 대화한다', affection: 20, trust: 12, type: 'robot_talk', successRate: 0.7 },
                    { text: '"귀여워요" 웃으며 즐긴다', affection: 16, trust: 14, type: 'cute', successRate: 0.8 },
                    { text: '명령을 내리는 척한다', affection: 18, trust: 12, type: 'command', successRate: 0.7 },
                    { text: '"왜 그래요?"', affection: -10, trust: -12, type: 'confused', successRate: 0.4 }
                ]
            },
            {
                id: 'humor_exaggerate',
                situation: '일상적인 일을 과장되게 표현합니다.',
                choices: [
                    { text: '같이 과장되게 호응한다', affection: 18, trust: 14, type: 'exaggerate_too', successRate: 0.7 },
                    { text: '"그렇게까지는..." 웃으며 말한다', affection: 14, trust: 16, type: 'tease', successRate: 0.8 },
                    { text: '재미있어하며 듣는다', affection: 16, trust: 14, type: 'enjoy', successRate: 0.8 },
                    { text: '"과장 좀 그만해요"', affection: -12, trust: -14, type: 'serious', successRate: 0.4 }
                ]
            },
            {
                id: 'humor_time_machine',
                situation: '"타임머신 있으면 언제로 갈래요?" 물어봅니다.',
                choices: [
                    { text: '진지하게 대답하며 이유를 설명한다', affection: 14, trust: 18, type: 'thoughtful', successRate: 0.8 },
                    { text: '"당신을 처음 만난 날로" 로맨틱하게 답한다', affection: 20, trust: 16, type: 'romantic', successRate: 0.7 },
                    { text: '재미있는 시대를 상상하며 이야기한다', affection: 16, trust: 14, type: 'imaginative', successRate: 0.8 },
                    { text: '"그런 건 의미 없어요"', affection: -10, trust: -12, type: 'dismissive', successRate: 0.4 }
                ]
            },
            {
                id: 'humor_superhero',
                situation: '"초능력 하나 가질 수 있다면?"',
                choices: [
                    { text: '흥미로운 능력을 제안한다', affection: 16, trust: 14, type: 'creative', successRate: 0.8 },
                    { text: '"당신을 지킬 수 있는 힘"', affection: 20, trust: 16, type: 'protective', successRate: 0.7 },
                    { text: '재미있게 상상하며 토론한다', affection: 18, trust: 14, type: 'discuss', successRate: 0.8 },
                    { text: '"그런 거 없어요"', affection: -12, trust: -14, type: 'realistic', successRate: 0.3 }
                ]
            },
            {
                id: 'humor_if_invisible',
                situation: '"투명인간이 되면 뭐 할래요?"',
                choices: [
                    { text: '재미있는 장난을 상상한다', affection: 16, trust: 14, type: 'pranks', successRate: 0.7 },
                    { text: '"당신 옆에서 지켜볼래요"', affection: 18, trust: 14, type: 'stalker_joke', successRate: 0.6 },
                    { text: '진지하게 유익한 일을 생각한다', affection: 14, trust: 18, type: 'helpful', successRate: 0.8 },
                    { text: '"이상한 질문이네요"', affection: -10, trust: -12, type: 'weird', successRate: 0.4 }
                ]
            },
            {
                id: 'humor_last_meal',
                situation: '"마지막 식사로 뭐 먹을래요?"',
                choices: [
                    { text: '좋아하는 음식을 진지하게 고민한다', affection: 14, trust: 16, type: 'serious', successRate: 0.8 },
                    { text: '"당신이 해준 음식"', affection: 20, trust: 18, type: 'sweet', successRate: 0.7 },
                    { text: '황당한 메뉴로 웃긴다', affection: 16, trust: 14, type: 'funny', successRate: 0.7 },
                    { text: '"무서운 질문이네요"', affection: -8, trust: -10, type: 'dark', successRate: 0.5 }
                ]
            }
        ]
    },
    hobby: {
        id: 'hobby',
        name: '취미 이야기',
        icon: '🎨',
        stamina: 14,
        baseAffection: 3,
        baseTrust: 3,
        description: '서로의 취미와 관심사를 나눕니다',
        scenarios: [
            {
                id: 'hobby_painting',
                situation: '"그림 그리는 것 좋아해요" 라고 말합니다.',
                choices: [
                    { text: '"어떤 그림 그리세요? 보고 싶어요"', affection: 14, trust: 16, type: 'interested' },
                    { text: '"저도 배워보고 싶어요. 가르쳐주세요"', affection: 16, trust: 14, type: 'join' },
                    { text: '"그림은 잘 모르겠어요"', affection: -8, trust: -10, type: 'indifferent' }
                ]
            },
            {
                id: 'hobby_photography',
                situation: '"사진 찍는 게 취미예요"',
                choices: [
                    { text: '"제 사진도 찍어주세요"', affection: 16, trust: 14, type: 'request' },
                    { text: '"어떤 사진 주로 찍으세요?"', affection: 14, trust: 16, type: 'curious' },
                    { text: '"요즘 누가 사진을..."', affection: -12, trust: -14, type: 'dismissive' }
                ]
            },
            {
                id: 'hobby_guitar',
                situation: '"기타 치는 거 배우고 있어요"',
                choices: [
                    { text: '"언젠가 제게 연주해주세요"', affection: 16, trust: 14, type: 'romantic' },
                    { text: '"어떤 곡 연습하세요?"', affection: 14, trust: 16, type: 'interested' },
                    { text: '"시끄럽지 않나요?"', affection: -15, trust: -18, type: 'rude' }
                ]
            },
            {
                id: 'hobby_cooking',
                situation: '"요리하는 게 정말 재미있어요"',
                choices: [
                    { text: '"언젠가 같이 요리해요"', affection: 18, trust: 16, type: 'together' },
                    { text: '"어떤 요리 잘하세요?"', affection: 14, trust: 14, type: 'curious' },
                    { text: '"저는 먹기만 할게요"', affection: -8, trust: -10, type: 'lazy' }
                ]
            },
            {
                id: 'hobby_reading',
                situation: '"독서가 취미예요. 요즘 재미있는 책 읽고 있어요"',
                choices: [
                    { text: '"어떤 책이에요? 추천해주세요"', affection: 16, trust: 18, type: 'interested' },
                    { text: '"같이 독서 모임 할까요?"', affection: 14, trust: 16, type: 'join' },
                    { text: '"책은 지루해요"', affection: -12, trust: -15, type: 'dismissive' }
                ]
            },
            {
                id: 'hobby_gaming',
                situation: '"게임하는 거 좋아해요"',
                choices: [
                    { text: '"같이 할 수 있는 게임 있어요?"', affection: 16, trust: 14, type: 'join' },
                    { text: '"어떤 게임 하세요?"', affection: 14, trust: 14, type: 'curious' },
                    { text: '"게임은 시간 낭비예요"', affection: -18, trust: -20, type: 'critical' }
                ]
            },
            {
                id: 'hobby_yoga',
                situation: '"요가 배우기 시작했어요"',
                choices: [
                    { text: '"건강에 좋죠. 대단해요"', affection: 14, trust: 16, type: 'supportive' },
                    { text: '"저도 같이 배울까요?"', affection: 16, trust: 14, type: 'join' },
                    { text: '"힘들지 않아요?"', affection: -6, trust: -8, type: 'doubting' }
                ]
            },
            {
                id: 'hobby_baking',
                situation: '"베이킹이 취미예요. 빵 만드는 게 재미있어요"',
                choices: [
                    { text: '"맛보고 싶어요!"', affection: 16, trust: 14, type: 'excited' },
                    { text: '"어떤 빵 만드세요?"', affection: 14, trust: 14, type: 'curious' },
                    { text: '"단 거 별로 안 좋아해요"', affection: -10, trust: -12, type: 'negative' }
                ]
            },
            {
                id: 'hobby_hiking',
                situation: '"등산하는 거 좋아해요"',
                choices: [
                    { text: '"같이 가요! 어디 좋은 곳 있어요?"', affection: 18, trust: 16, type: 'enthusiastic' },
                    { text: '"건강하시겠어요"', affection: 14, trust: 14, type: 'compliment' },
                    { text: '"저는 집이 좋은데..."', affection: -12, trust: -14, type: 'lazy' }
                ]
            },
            {
                id: 'hobby_collecting',
                situation: '"피규어 수집하는 게 취미예요"',
                choices: [
                    { text: '"어떤 거 모으세요? 보여주세요"', affection: 16, trust: 18, type: 'interested' },
                    { text: '"열정이 멋져요"', affection: 14, trust: 16, type: 'supportive' },
                    { text: '"돈 낭비 아니에요?"', affection: -20, trust: -22, type: 'critical' }
                ]
            },
            {
                id: 'hobby_dance',
                situation: '"춤추는 게 좋아요"',
                choices: [
                    { text: '"같이 춤춰요!"', affection: 18, trust: 14, type: 'join' },
                    { text: '"어떤 춤 추세요?"', affection: 14, trust: 14, type: 'curious' },
                    { text: '"저는 춤 못 춰요"', affection: -8, trust: -10, type: 'refuse' }
                ]
            },
            {
                id: 'hobby_gardening',
                situation: '"식물 키우는 게 취미예요"',
                choices: [
                    { text: '"무슨 식물 키우세요?"', affection: 14, trust: 16, type: 'interested' },
                    { text: '"저도 배우고 싶어요"', affection: 16, trust: 14, type: 'join' },
                    { text: '"저는 식물 다 죽여요"', affection: -6, trust: -8, type: 'negative' }
                ]
            },
            {
                id: 'hobby_writing',
                situation: '"글쓰기가 취미예요"',
                choices: [
                    { text: '"어떤 글 쓰세요? 읽어보고 싶어요"', affection: 16, trust: 18, type: 'interested' },
                    { text: '"멋져요. 언젠가 책 내세요"', affection: 14, trust: 16, type: 'encouraging' },
                    { text: '"글쓰기는 어려워요"', affection: -6, trust: -8, type: 'dismissive' }
                ]
            },
            {
                id: 'hobby_running',
                situation: '"러닝이 취미예요"',
                choices: [
                    { text: '"같이 뛸까요?"', affection: 18, trust: 16, type: 'join' },
                    { text: '"건강하시겠어요"', affection: 14, trust: 14, type: 'compliment' },
                    { text: '"힘들지 않아요?"', affection: -6, trust: -8, type: 'doubting' }
                ]
            },
            {
                id: 'hobby_board_games',
                situation: '"보드게임 좋아해요"',
                choices: [
                    { text: '"같이 해요! 무슨 게임 좋아하세요?"', affection: 18, trust: 16, type: 'enthusiastic' },
                    { text: '"재미있겠어요"', affection: 14, trust: 14, type: 'positive' },
                    { text: '"유치한 거 아니에요?"', affection: -15, trust: -18, type: 'dismissive' }
                ]
            },
            {
                id: 'hobby_fishing',
                situation: '"낚시하는 게 좋아요"',
                choices: [
                    { text: '"같이 가요. 가르쳐주세요"', affection: 16, trust: 16, type: 'join' },
                    { text: '"여유로워 보여요"', affection: 14, trust: 14, type: 'positive' },
                    { text: '"지루하지 않아요?"', affection: -12, trust: -14, type: 'negative' }
                ]
            },
            {
                id: 'hobby_knitting',
                situation: '"뜨개질이 취미예요"',
                choices: [
                    { text: '"제게도 뭔가 만들어주세요"', affection: 16, trust: 14, type: 'request' },
                    { text: '"손재주가 좋으시네요"', affection: 14, trust: 14, type: 'compliment' },
                    { text: '"할머니 취미 아니에요?"', affection: -18, trust: -20, type: 'rude' }
                ]
            },
            {
                id: 'hobby_cycling',
                situation: '"자전거 타는 게 좋아요"',
                choices: [
                    { text: '"같이 라이딩 가요!"', affection: 18, trust: 16, type: 'join' },
                    { text: '"어디 타러 가세요?"', affection: 14, trust: 14, type: 'curious' },
                    { text: '"위험하지 않아요?"', affection: -8, trust: -10, type: 'worried' }
                ]
            },
            {
                id: 'hobby_pottery',
                situation: '"도자기 만드는 거 배우고 있어요"',
                choices: [
                    { text: '"멋져요! 작품 보고 싶어요"', affection: 16, trust: 18, type: 'interested' },
                    { text: '"같이 배울 수 있을까요?"', affection: 18, trust: 16, type: 'join' },
                    { text: '"어려울 것 같은데..."', affection: -8, trust: -10, type: 'doubting' }
                ]
            },
            {
                id: 'hobby_astronomy',
                situation: '"천체 관측이 취미예요"',
                choices: [
                    { text: '"같이 별 보러 가요!"', affection: 20, trust: 18, type: 'romantic' },
                    { text: '"로맨틱하네요"', affection: 16, trust: 14, type: 'positive' },
                    { text: '"밤에 춥지 않아요?"', affection: -6, trust: -8, type: 'practical' }
                ]
            },
            {
                id: 'hobby_podcast',
                situation: '"팟캐스트 듣는 게 좋아요"',
                choices: [
                    { text: '"어떤 거 들으세요? 추천해주세요"', affection: 14, trust: 16, type: 'interested' },
                    { text: '"같이 들어요"', affection: 16, trust: 14, type: 'join' },
                    { text: '"그런 게 재미있어요?"', affection: -10, trust: -12, type: 'dismissive' }
                ]
            },
            {
                id: 'hobby_volunteering',
                situation: '"봉사활동하는 게 보람차요"',
                choices: [
                    { text: '"존경스러워요. 같이 할 수 있을까요?"', affection: 18, trust: 20, type: 'respectful' },
                    { text: '"어떤 봉사하세요?"', affection: 14, trust: 18, type: 'curious' },
                    { text: '"시간 많으시네요"', affection: -15, trust: -18, type: 'sarcastic' }
                ]
            },
            {
                id: 'hobby_magic',
                situation: '"마술 배우는 게 취미예요"',
                choices: [
                    { text: '"보여주세요! 신기할 것 같아요"', affection: 18, trust: 16, type: 'excited' },
                    { text: '"어떤 마술 할 수 있어요?"', affection: 14, trust: 14, type: 'curious' },
                    { text: '"트릭일 뿐이잖아요"', affection: -15, trust: -18, type: 'dismissive' }
                ]
            },
            {
                id: 'hobby_coding',
                situation: '"프로그래밍이 취미예요"',
                choices: [
                    { text: '"멋져요! 뭘 만드세요?"', affection: 16, trust: 18, type: 'interested' },
                    { text: '"저도 배워보고 싶어요"', affection: 14, trust: 16, type: 'join' },
                    { text: '"너무 어려워요"', affection: -8, trust: -10, type: 'negative' }
                ]
            },
            {
                id: 'hobby_language',
                situation: '"외국어 공부하는 게 재미있어요"',
                choices: [
                    { text: '"어떤 언어요? 같이 배워요"', affection: 18, trust: 16, type: 'join' },
                    { text: '"대단하시네요"', affection: 14, trust: 14, type: 'compliment' },
                    { text: '"필요해요?"', affection: -10, trust: -12, type: 'dismissive' }
                ]
            },
            {
                id: 'hobby_animals',
                situation: '"동물 보호소에서 봉사해요"',
                choices: [
                    { text: '"같이 가도 될까요?"', affection: 18, trust: 18, type: 'join' },
                    { text: '"착하시네요"', affection: 14, trust: 16, type: 'compliment' },
                    { text: '"냄새 안 나요?"', affection: -18, trust: -20, type: 'rude' }
                ]
            },
            {
                id: 'hobby_model',
                situation: '"프라모델 조립하는 게 취미예요"',
                choices: [
                    { text: '"어떤 거 만드세요? 보여주세요"', affection: 16, trust: 16, type: 'interested' },
                    { text: '"집중력이 좋으시네요"', affection: 14, trust: 14, type: 'compliment' },
                    { text: '"애들 장난감 아니에요?"', affection: -18, trust: -20, type: 'rude' }
                ]
            },
            {
                id: 'hobby_meditation',
                situation: '"명상하는 게 취미예요"',
                choices: [
                    { text: '"저도 배우고 싶어요"', affection: 16, trust: 16, type: 'join' },
                    { text: '"평화로워 보여요"', affection: 14, trust: 14, type: 'positive' },
                    { text: '"그냥 가만히 있는 거 아니에요?"', affection: -12, trust: -14, type: 'dismissive' }
                ]
            },
            {
                id: 'hobby_singing',
                situation: '"노래 부르는 거 좋아해요"',
                choices: [
                    { text: '"같이 노래방 가요!"', affection: 18, trust: 16, type: 'join' },
                    { text: '"어떤 노래 좋아하세요?"', affection: 14, trust: 14, type: 'curious' },
                    { text: '"저는 음치예요"', affection: -6, trust: -8, type: 'negative' }
                ]
            },
            {
                id: 'hobby_investment',
                situation: '"주식 투자 공부하고 있어요"',
                choices: [
                    { text: '"현명하시네요. 조언 부탁해요"', affection: 14, trust: 18, type: 'respectful' },
                    { text: '"어떻게 공부하세요?"', affection: 12, trust: 16, type: 'curious' },
                    { text: '"위험하지 않아요?"', affection: -8, trust: -10, type: 'worried' }
                ]
            },
            {
                id: 'hobby_wine',
                situation: '"와인 공부하는 게 취미예요"',
                choices: [
                    { text: '"멋져요! 추천해주세요"', affection: 16, trust: 16, type: 'interested' },
                    { text: '"같이 와인 시음회 가요"', affection: 18, trust: 16, type: 'join' },
                    { text: '"술은 별로예요"', affection: -12, trust: -14, type: 'negative' }
                ]
            },
            {
                id: 'hobby_camping',
                situation: '"캠핑 다니는 게 좋아요"',
                choices: [
                    { text: '"같이 가요! 언제 갈까요?"', affection: 20, trust: 18, type: 'enthusiastic' },
                    { text: '"자연 속에서 좋겠어요"', affection: 14, trust: 14, type: 'positive' },
                    { text: '"불편하지 않아요?"', affection: -10, trust: -12, type: 'negative' }
                ]
            },
            {
                id: 'hobby_coffee',
                situation: '"커피 로스팅이 취미예요"',
                choices: [
                    { text: '"맛보고 싶어요!"', affection: 16, trust: 16, type: 'excited' },
                    { text: '"전문가시네요"', affection: 14, trust: 14, type: 'compliment' },
                    { text: '"그냥 사 먹으면 안 돼요?"', affection: -15, trust: -18, type: 'dismissive' }
                ]
            },
            {
                id: 'hobby_escape_room',
                situation: '"저 방탈출 게임 진짜 좋아하거든요. 퍼즐 풀고 단서 찾는 그 짜릿함이 너무 재미있어요. 혹시 같이 한번 해보실래요?"',
                choices: [
                    { text: '"오 재미있겠는데요! 저도 예전부터 해보고 싶었어요. 언제 같이 도전해봐요! 팀워크가 중요하다던데, 우리 둘이 힘 합치면 금방 탈출할 수 있을 것 같아요"', affection: 18, trust: 16, type: 'join' },
                    { text: '"방탈출 게임 정말 재미있겠어요. 그런 거 좋아하시는구나. 두뇌 게임 좋아하시는 스타일이네요. 멋있어요"', affection: 14, trust: 14, type: 'positive' },
                    { text: '"갇히는 거 생각하니까 좀 무서운데요... 폐쇄공포증 있으면 어떡하죠? 저는 좀..."', affection: -8, trust: -10, type: 'scared' }
                ]
            },
            {
                id: 'hobby_calligraphy',
                situation: '"요즘 서예를 배우고 있어요. 붓으로 한 획 한 획 정성스럽게 쓰다 보면 마음이 차분해지더라고요. 전통적인 취미라 좀 특이하죠?"',
                choices: [
                    { text: '"와, 정말 멋진 취미네요! 서예 작품 정말 보고 싶어요. 언제 한번 보여주실 수 있나요? 필체도 궁금하고요"', affection: 16, trust: 16, type: 'interested' },
                    { text: '"서예라니 정말 고급스러운 취미예요. 저도 배우고 싶은데 가르쳐주실 수 있어요? 같이 배우면 재미있을 것 같아요"', affection: 14, trust: 16, type: 'join' },
                    { text: '"요즘 시대에 누가 서예를 해요... 좀 옛날 취미 아닌가요? 다른 재미있는 거 하는 게 낫지 않아요?"', affection: -18, trust: -20, type: 'dismissive' }
                ]
            },
            {
                id: 'hobby_vlog',
                situation: '"저 요즘 브이로그 찍는 게 취미예요. 일상을 영상으로 기록하고 편집하는 게 정말 재미있거든요. 나중에 추억으로도 남고요"',
                choices: [
                    { text: '"와 진짜요? 너무 보고 싶은데요! 어디 채널이에요? 바로 구독할게요! 일상이 얼마나 재미있게 담겨있을지 정말 궁금해요"', affection: 16, trust: 16, type: 'interested' },
                    { text: '"오 그럼 저도 출연해도 될까요? 같이 브이로그 찍으면 재미있을 것 같은데요. 당신과 함께하는 일상 영상, 좋을 것 같아요"', affection: 18, trust: 14, type: 'join' },
                    { text: '"카메라 앞에 서는 거 부끄럽지 않아요? 저는 좀 그런 거 이해가 안 가는데... 왜 굳이 일상을 찍어요?"', affection: -10, trust: -12, type: 'negative' }
                ]
            },
            {
                id: 'hobby_skateboard',
                situation: '"저 스케이트보드 타는 게 취미예요. 바람 가르며 달리는 그 느낌, 기술 하나하나 익혀가는 재미가 있어요. 좀 위험해 보이긴 하지만요"',
                choices: [
                    { text: '"와 정말 멋있는데요! 스케이트보드 타는 모습 진짜 보고 싶어요. 저도 타보고 싶은데 가르쳐주실 수 있나요? 처음엔 넘어질 것 같지만 같이하면 재미있을 것 같아요"', affection: 18, trust: 16, type: 'join' },
                    { text: '"스케이트보드 정말 멋진 스포츠죠. 근데 다치지 않게 조심하세요. 보호대 꼭 착용하시고요. 당신 안전이 제일 중요하니까요"', affection: 12, trust: 14, type: 'worried' },
                    { text: '"위험하지 않아요? 다치면 어떡하려고 그런 걸 해요... 좀 더 안전한 취미를 가지는 게 낫지 않을까요?"', affection: -8, trust: -10, type: 'worried_negative' }
                ]
            },
            {
                id: 'hobby_diy',
                situation: '"저 DIY 공예가 취미예요. 직접 뭔가를 만드는 게 너무 재미있어요. 나만의 작품을 만들 수 있잖아요. 요즘은 목공예에 빠져있어요"',
                choices: [
                    { text: '"우와 정말 대단하시네요! 무슨 작품들 만드셨는지 너무 궁금한데요. 보여주실 수 있어요? 손재주가 정말 좋으신가봐요"', affection: 16, trust: 16, type: 'interested' },
                    { text: '"저도 같이 만들어보면 안 될까요? 당신한테 배우고 싶어요. 함께 뭔가 만들면 정말 특별한 추억이 될 것 같아요"', affection: 18, trust: 16, type: 'join' },
                    { text: '"힘들게 직접 만들어요? 그냥 사는 게 훨씬 편하고 깔끔하지 않나요? 시간과 노력이 너무 많이 드는 것 같은데..."', affection: -15, trust: -18, type: 'dismissive' }
                ]
            },
            {
                id: 'hobby_tea',
                situation: '"저 차 공부하는 게 취미예요. 다양한 차를 마시면서 향과 맛을 음미하는 게 정말 좋아요. 요즘은 전통 차에 푹 빠져있어요"',
                choices: [
                    { text: '"와 정말 고급스러운 취미네요. 저도 차 정말 좋아하는데, 언제 같이 차 한잔 하면서 이야기 나눠요. 당신이 좋아하는 차 같이 마시고 싶어요"', affection: 18, trust: 16, type: 'join' },
                    { text: '"차 공부라니 멋지네요. 어떤 차를 제일 좋아하세요? 추천해주실 수 있어요? 저도 한번 시작해보고 싶어요"', affection: 14, trust: 14, type: 'curious' },
                    { text: '"차보다는 커피가 훨씬 더 낫지 않아요? 요즘 누가 차를 마셔요... 좀 올드하신 것 같은데요"', affection: -12, trust: -14, type: 'dismissive' }
                ]
            }
        ]
    },
    memories: {
        id: 'memories',
        name: '추억 나누기',
        icon: '📸',
        stamina: 16,
        baseAffection: 4,
        baseTrust: 5,
        description: '과거의 소중한 기억들을 함께 나눕니다',
        minAffection: 30,
        scenarios: [
            {
                id: 'memories_childhood_home',
                situation: '"가끔 어릴 때 살던 집이 그리워요. 좁았지만 따뜻한 기억들이 가득한 곳이었거든요. 지금은 다른 사람이 살고 있겠지만, 그 동네 골목길들이 아직도 생생해요"',
                choices: [
                    { text: '"어떤 집이었는지 더 자세히 이야기해주실래요? 듣고 있으면 제가 다 그려지는 것 같아요. 당신의 소중한 기억들이 궁금해요"', affection: 16, trust: 18, type: 'listen' },
                    { text: '"정말 소중한 추억이 있는 곳이네요. 언젠가 시간 나면 그 동네에 같이 가볼까요? 당신의 어린 시절이 시작된 곳, 함께 걸어보고 싶어요"', affection: 18, trust: 16, type: 'romantic' },
                    { text: '"과거는 그냥 과거일 뿐이에요. 지금 현재를 사는 게 더 중요하지 않나요? 옛날 일은 잊어버리는 게 나아요"', affection: -12, trust: -15, type: 'dismissive' }
                ]
            },
            {
                id: 'memories_first_love',
                situation: '"혹시... 제 첫사랑 이야기 궁금하세요? 말하기 좀 그런데, 물어보시면 솔직하게 이야기해드릴게요. 아니면 안 물어보셔도 괜찮아요"',
                choices: [
                    { text: '"듣고 싶어요. 당신의 과거도 당신의 일부니까요. 어떤 사람이었는지, 어떤 감정이었는지 궁금해요. 솔직하게 이야기해줘요"', affection: 14, trust: 20, type: 'open' },
                    { text: '"과거의 사랑보다는 지금 우리의 현재가 훨씬 더 중요하다고 생각해요. 하지만 말하고 싶으시면 들을게요"', affection: 12, trust: 16, type: 'present_focus' },
                    { text: '"솔직히 전 애인 이야기는 듣고 싶지 않은데요... 그냥 지나간 일로 남겨두는 게 좋을 것 같아요"', affection: -10, trust: -12, type: 'jealous' }
                ]
            },
            {
                id: 'memories_best_friend',
                situation: '"어릴 때 정말 친했던 친구가 있었어요. 매일 같이 놀고, 비밀도 공유하고... 그 친구와의 추억들이 제 어린 시절의 전부였던 것 같아요"',
                choices: [
                    { text: '"우와, 정말 소중한 친구였나봐요. 어떤 친구였는지, 어떻게 친해지셨는지 더 자세히 듣고 싶어요. 당신의 소중한 사람 이야기가 궁금해요"', affection: 14, trust: 18, type: 'interested' },
                    { text: '"그 친구분과 지금도 연락하고 지내시나요? 어린 시절 친구와 계속 연락하고 지낸다는 건 정말 특별한 인연인 것 같아요"', affection: 12, trust: 16, type: 'curious' },
                    { text: '"옛날 친구 얘기는... 좀 지루한데요. 지금 친구들 이야기가 더 재미있지 않나요? 옛날 일은 그냥 넘어가요"', affection: -8, trust: -10, type: 'uninterested' }
                ]
            },
            {
                id: 'memories_family_trip',
                situation: '"어렸을 때 가족들과 함께 여행 갔던 기억이 문득 떠올라요. 그때는 별거 아닌 줄 알았는데, 지금 생각해보니 정말 소중한 추억이었던 것 같아요"',
                choices: [
                    { text: '"어디로 여행 가셨는지 이야기해줘요. 가족분들과의 여행 이야기 정말 듣고 싶어요. 어떤 일들이 있었는지 궁금해요"', affection: 16, trust: 18, type: 'listen' },
                    { text: '"가족과 함께한 추억이라니 정말 좋은 기억이네요. 그런 순간들이 나중에 되돌아보면 정말 소중하게 느껴지죠"', affection: 14, trust: 16, type: 'positive' },
                    { text: '"가족 여행 얘기는 좀 지루한데요... 다른 재미있는 이야기 없어요? 가족 얘기는 그만하고 다른 얘기 해요"', affection: -15, trust: -18, type: 'rude' }
                ]
            },
            {
                id: 'memories_graduation',
                situation: '"졸업식 날이 기억나요"',
                choices: [
                    { text: '"그때 기분이 어땠어요?"', affection: 14, trust: 18, type: 'empathetic' },
                    { text: '"저도 그때가 생각나요"', affection: 16, trust: 16, type: 'relate' },
                    { text: '"그게 중요해요?"', affection: -10, trust: -12, type: 'dismissive' }
                ]
            },
            {
                id: 'memories_pet',
                situation: '"어릴 때 키우던 강아지가 그리워요"',
                choices: [
                    { text: '"어떤 강아지였어요?"', affection: 16, trust: 18, type: 'caring' },
                    { text: '"많이 그리우시겠어요"', affection: 18, trust: 20, type: 'empathetic' },
                    { text: '"동물일 뿐이에요"', affection: -20, trust: -22, type: 'cold' }
                ]
            },
            {
                id: 'memories_teacher',
                situation: '"은사님 생각이 나요"',
                choices: [
                    { text: '"어떤 분이셨는지 이야기해줘요"', affection: 14, trust: 18, type: 'interested' },
                    { text: '"연락드려보는 게 어때요?"', affection: 16, trust: 16, type: 'suggest' },
                    { text: '"선생님 얘기는..."', affection: -8, trust: -10, type: 'uninterested' }
                ]
            },
            {
                id: 'memories_first_concert',
                situation: '"처음 간 콘서트가 기억나요"',
                choices: [
                    { text: '"누구 콘서트였어요?"', affection: 14, trust: 16, type: 'curious' },
                    { text: '"재미있었겠어요"', affection: 12, trust: 14, type: 'positive' },
                    { text: '"그런 거 돈 아까워요"', affection: -15, trust: -18, type: 'negative' }
                ]
            },
            {
                id: 'memories_accident',
                situation: '"어릴 때 다친 적 있어요"',
                choices: [
                    { text: '"괜찮았어요? 어떻게 됐어요?"', affection: 16, trust: 20, type: 'concerned' },
                    { text: '"많이 아팠겠어요"', affection: 14, trust: 18, type: 'empathetic' },
                    { text: '"조심하지 그랬어요"', affection: -12, trust: -15, type: 'blame' }
                ]
            },
            {
                id: 'memories_birthday',
                situation: '"어릴 때 생일 파티 기억나요"',
                choices: [
                    { text: '"어떤 파티였는지 이야기해줘요"', affection: 16, trust: 16, type: 'interested' },
                    { text: '"행복한 기억이네요"', affection: 14, trust: 14, type: 'positive' },
                    { text: '"옛날 얘기는..."', affection: -8, trust: -10, type: 'uninterested' }
                ]
            },
            {
                id: 'memories_embarrassing',
                situation: '"창피했던 기억이 있어요"',
                choices: [
                    { text: '"괜찮아요. 누구나 그래요"', affection: 18, trust: 20, type: 'comforting' },
                    { text: '"뭐였는지 궁금해요"', affection: 12, trust: 14, type: 'curious' },
                    { text: '웃으며 놀린다', affection: -15, trust: -18, type: 'mock' }
                ]
            },
            {
                id: 'memories_achievement',
                situation: '"상 받았던 기억이 나요"',
                choices: [
                    { text: '"대단하시네요! 뭐였어요?"', affection: 16, trust: 16, type: 'impressed' },
                    { text: '"자랑스러우시겠어요"', affection: 14, trust: 14, type: 'supportive' },
                    { text: '"별거 아니었나봐요"', affection: -18, trust: -20, type: 'dismissive' }
                ]
            },
            {
                id: 'memories_move',
                situation: '"이사 많이 다녔어요"',
                choices: [
                    { text: '"힘들었겠어요"', affection: 16, trust: 18, type: 'empathetic' },
                    { text: '"어디어디 살았어요?"', affection: 14, trust: 16, type: 'curious' },
                    { text: '"그래서요?"', affection: -10, trust: -12, type: 'indifferent' }
                ]
            },
            {
                id: 'memories_festival',
                situation: '"학교 축제가 그리워요"',
                choices: [
                    { text: '"어떤 축제였는지 이야기해줘요"', affection: 14, trust: 16, type: 'interested' },
                    { text: '"재미있었겠어요"', affection: 12, trust: 14, type: 'positive' },
                    { text: '"축제가 뭐가 좋아요?"', affection: -12, trust: -14, type: 'negative' }
                ]
            },
            {
                id: 'memories_grandparent',
                situation: '"할머니/할아버지 생각이 나요"',
                choices: [
                    { text: '"어떤 분이셨는지 이야기해줘요"', affection: 16, trust: 20, type: 'caring' },
                    { text: '손을 잡아준다', affection: 20, trust: 22, type: 'comforting' },
                    { text: '"슬픈 얘기는..."', affection: -15, trust: -18, type: 'avoid' }
                ]
            },
            {
                id: 'memories_hobby_start',
                situation: '"이 취미를 시작한 계기가 있어요"',
                choices: [
                    { text: '"궁금해요. 이야기해줘요"', affection: 16, trust: 18, type: 'interested' },
                    { text: '"특별한 이야기네요"', affection: 14, trust: 16, type: 'positive' },
                    { text: '"그냥 시작한 거 아니에요?"', affection: -10, trust: -12, type: 'dismissive' }
                ]
            },
            {
                id: 'memories_failure',
                situation: '"실패했던 기억이 있어요"',
                choices: [
                    { text: '"그래도 배운 게 있을 거예요"', affection: 18, trust: 20, type: 'supportive' },
                    { text: '"힘들었겠어요"', affection: 16, trust: 18, type: 'empathetic' },
                    { text: '"그러니까 조심하지..."', affection: -18, trust: -20, type: 'blame' }
                ]
            },
            {
                id: 'memories_friendship_end',
                situation: '"친구랑 멀어진 적 있어요"',
                choices: [
                    { text: '"슬프셨겠어요"', affection: 18, trust: 20, type: 'empathetic' },
                    { text: '"무슨 일이었어요?"', affection: 14, trust: 18, type: 'curious' },
                    { text: '"그럴 수도 있죠"', affection: -10, trust: -12, type: 'cold' }
                ]
            },
            {
                id: 'memories_award',
                situation: '"대회에서 우승한 적 있어요"',
                choices: [
                    { text: '"대단하시네요!"', affection: 16, trust: 16, type: 'impressed' },
                    { text: '"어떤 대회였어요?"', affection: 14, trust: 16, type: 'curious' },
                    { text: '"자랑하시네요"', affection: -15, trust: -18, type: 'sarcastic' }
                ]
            },
            {
                id: 'memories_first_job',
                situation: '"첫 직장이 기억나요"',
                choices: [
                    { text: '"어땠어요? 이야기해줘요"', affection: 14, trust: 18, type: 'interested' },
                    { text: '"힘들었겠어요"', affection: 16, trust: 16, type: 'empathetic' },
                    { text: '"다들 그래요"', affection: -10, trust: -12, type: 'dismissive' }
                ]
            },
            {
                id: 'memories_regret',
                situation: '"후회되는 일이 있어요"',
                choices: [
                    { text: '"괜찮아요. 누구나 그래요"', affection: 20, trust: 22, type: 'comforting' },
                    { text: '"지금이라도 만회할 수 있어요"', affection: 18, trust: 20, type: 'encouraging' },
                    { text: '"그때 왜 그랬어요?"', affection: -18, trust: -20, type: 'blame' }
                ]
            },
            {
                id: 'memories_old_photo',
                situation: '옛날 사진을 보여줍니다.',
                choices: [
                    { text: '"귀여우시네요"', affection: 18, trust: 16, type: 'cute' },
                    { text: '"많이 변하셨네요"', affection: 12, trust: 14, type: 'honest' },
                    { text: '"왜 이렇게 변했어요?"', affection: -15, trust: -18, type: 'rude' }
                ]
            },
            {
                id: 'memories_old_house',
                situation: '"옛날 집 앞을 지나갔어요"',
                choices: [
                    { text: '"감회가 새로우시겠어요"', affection: 16, trust: 18, type: 'understanding' },
                    { text: '"어떤 기분이었어요?"', affection: 14, trust: 16, type: 'curious' },
                    { text: '"그게 중요해요?"', affection: -10, trust: -12, type: 'dismissive' }
                ]
            },
            {
                id: 'memories_bully',
                situation: '"학교 다닐 때 힘든 일 있었어요"',
                choices: [
                    { text: '"많이 힘들었겠어요" 위로한다', affection: 20, trust: 24, type: 'comforting' },
                    { text: '손을 잡아준다', affection: 22, trust: 26, type: 'supportive' },
                    { text: '"왜 말 안 했어요?"', affection: -12, trust: -15, type: 'blame' }
                ]
            },
            {
                id: 'memories_dream_job',
                situation: '"어릴 때 꿈이 있었어요"',
                choices: [
                    { text: '"뭐였는지 이야기해줘요"', affection: 14, trust: 18, type: 'interested' },
                    { text: '"지금이라도 도전할 수 있어요"', affection: 18, trust: 20, type: 'encouraging' },
                    { text: '"꿈은 꿈일 뿐이에요"', affection: -18, trust: -20, type: 'harsh' }
                ]
            },
            {
                id: 'memories_performance',
                situation: '"무대에 섰던 기억이 있어요"',
                choices: [
                    { text: '"멋지셨겠어요!"', affection: 16, trust: 16, type: 'impressed' },
                    { text: '"어떤 무대였어요?"', affection: 14, trust: 16, type: 'curious' },
                    { text: '"떨리지 않았어요?"', affection: 10, trust: 12, type: 'question' }
                ]
            },
            {
                id: 'memories_lost_item',
                situation: '"소중한 물건을 잃어버린 적 있어요"',
                choices: [
                    { text: '"슬프셨겠어요"', affection: 18, trust: 20, type: 'empathetic' },
                    { text: '"무슨 물건이었어요?"', affection: 14, trust: 16, type: 'curious' },
                    { text: '"조심하지 그랬어요"', affection: -15, trust: -18, type: 'blame' }
                ]
            },
            {
                id: 'memories_holiday',
                situation: '"명절 때 기억이 나요"',
                choices: [
                    { text: '"어떤 추억이 있으세요?"', affection: 14, trust: 16, type: 'interested' },
                    { text: '"좋은 기억이네요"', affection: 12, trust: 14, type: 'positive' },
                    { text: '"명절은 피곤해요"', affection: -10, trust: -12, type: 'negative' }
                ]
            },
            {
                id: 'memories_promise',
                situation: '"어릴 때 한 약속이 있어요"',
                choices: [
                    { text: '"지켰어요?"', affection: 14, trust: 18, type: 'curious' },
                    { text: '"어떤 약속이었어요?"', affection: 12, trust: 16, type: 'interested' },
                    { text: '"어릴 때 약속은..."', affection: -10, trust: -12, type: 'dismissive' }
                ]
            },
            {
                id: 'memories_sports_day',
                situation: '"운동회 때 기억이 나요"',
                choices: [
                    { text: '"재미있었겠어요"', affection: 14, trust: 14, type: 'positive' },
                    { text: '"어떤 종목 했어요?"', affection: 12, trust: 14, type: 'curious' },
                    { text: '"그런 거 싫었어요"', affection: -8, trust: -10, type: 'negative' }
                ]
            },
            {
                id: 'memories_mentor',
                situation: '"저에게 영향 준 분이 있어요"',
                choices: [
                    { text: '"어떤 분이셨는지 궁금해요"', affection: 16, trust: 20, type: 'interested' },
                    { text: '"좋은 만남이었네요"', affection: 14, trust: 18, type: 'positive' },
                    { text: '"그래서요?"', affection: -12, trust: -14, type: 'indifferent' }
                ]
            },
            {
                id: 'memories_sick',
                situation: '"어릴 때 많이 아팠어요"',
                choices: [
                    { text: '"많이 힘들었겠어요"', affection: 18, trust: 22, type: 'empathetic' },
                    { text: '"지금은 건강하시니 다행이에요"', affection: 16, trust: 20, type: 'positive' },
                    { text: '"그래서 약하신 거예요?"', affection: -20, trust: -22, type: 'insensitive' }
                ]
            },
            {
                id: 'memories_talent',
                situation: '"숨은 재능이 있었어요"',
                choices: [
                    { text: '"뭐였어요? 보여주세요"', affection: 16, trust: 16, type: 'excited' },
                    { text: '"대단하시네요"', affection: 14, trust: 14, type: 'impressed' },
                    { text: '"지금은 못 하시나봐요"', affection: -15, trust: -18, type: 'sarcastic' }
                ]
            },
            {
                id: 'memories_snow',
                situation: '"눈 오는 날 추억이 있어요"',
                choices: [
                    { text: '"이야기해줘요"', affection: 14, trust: 16, type: 'interested' },
                    { text: '"로맨틱하네요"', affection: 16, trust: 14, type: 'romantic' },
                    { text: '"눈은 불편해요"', affection: -10, trust: -12, type: 'negative' }
                ]
            },
            {
                id: 'memories_camp',
                situation: '"수련회 갔던 기억이 나요"',
                choices: [
                    { text: '"재미있었어요?"', affection: 14, trust: 14, type: 'curious' },
                    { text: '"무슨 일 있었어요?"', affection: 12, trust: 14, type: 'interested' },
                    { text: '"그런 거 싫어요"', affection: -8, trust: -10, type: 'negative' }
                ]
            },
            {
                id: 'memories_dance',
                situation: '"학예회 때 춤췄어요"',
                choices: [
                    { text: '"보고 싶어요"', affection: 16, trust: 14, type: 'excited' },
                    { text: '"멋지셨겠어요"', affection: 14, trust: 14, type: 'positive' },
                    { text: '"창피하지 않았어요?"', affection: -10, trust: -12, type: 'negative' }
                ]
            },
            {
                id: 'memories_rebellion',
                situation: '"반항기가 있었어요"',
                choices: [
                    { text: '"어떻게 지나갔어요?"', affection: 14, trust: 18, type: 'curious' },
                    { text: '"다들 그런 시기 있죠"', affection: 16, trust: 16, type: 'understanding' },
                    { text: '"부모님 힘들으셨겠네요"', affection: -12, trust: -14, type: 'judgmental' }
                ]
            },
            {
                id: 'memories_rescue',
                situation: '"누군가를 도운 기억이 있어요"',
                choices: [
                    { text: '"멋지시네요!"', affection: 18, trust: 20, type: 'impressed' },
                    { text: '"어떻게 도왔어요?"', affection: 16, trust: 18, type: 'curious' },
                    { text: '"위험하지 않았어요?"', affection: 12, trust: 14, type: 'worried' }
                ]
            },
            {
                id: 'memories_treasure',
                situation: '"보물 찾기 했던 기억이 나요"',
                choices: [
                    { text: '"재미있었겠어요"', affection: 14, trust: 14, type: 'positive' },
                    { text: '"찾았어요?"', affection: 12, trust: 12, type: 'curious' },
                    { text: '"유치하네요"', affection: -15, trust: -18, type: 'dismissive' }
                ]
            }
        ]
    },
    values: {
        id: 'values',
        name: '가치관',
        icon: '💭',
        stamina: 20,
        baseAffection: 2,
        baseTrust: 6,
        description: '인생관과 가치관에 대해 깊이 이야기합니다',
        minAffection: 50,
        scenarios: [
            {
                id: 'values_success',
                situation: '"당신에게 성공이란 무엇인가요? 사람들마다 성공의 기준이 다 다르잖아요. 저는 당신이 어떻게 생각하는지 정말 궁금해요"',
                choices: [
                    { text: '"저는 행복하게 사는 것이 진정한 성공이라고 생각해요. 돈이 많거나 유명해지는 것보다 매일 웃으면서 살 수 있다면 그게 가장 성공한 삶이죠"', affection: 16, trust: 20, type: 'happiness' },
                    { text: '"자신이 세운 목표를 이루는 것이 성공이라고 생각해요. 목표가 크든 작든, 그걸 달성하기 위해 노력하고 이뤄냈을 때의 성취감이 진정한 성공이죠"', affection: 14, trust: 22, type: 'achievement' },
                    { text: '"솔직히 돈과 명예가 성공 아닌가요? 현실적으로 그게 있어야 인정받고 살 수 있잖아요. 이상보다는 현실이 중요하죠"', affection: -10, trust: -12, type: 'materialistic' }
                ]
            },
            {
                id: 'values_money',
                situation: '"좀 직접적인 질문일 수 있는데... 당신에게 돈과 사랑 중 뭐가 더 중요해요? 둘 다 소중하지만 정말 선택해야 한다면요?"',
                choices: [
                    { text: '"저는 사랑이 우선이에요. 돈은 언젠가 벌 수 있지만, 진정한 사랑은 찾기 어렵잖아요. 사랑하는 사람과 함께라면 가난해도 행복할 수 있다고 생각해요"', affection: 20, trust: 18, type: 'love' },
                    { text: '"어려운 질문이네요. 솔직히 둘 다 정말 중요하다고 생각해요. 사랑도 있어야 하고, 현실적으로 살아가려면 돈도 필요하니까요. 균형이 중요하죠"', affection: 12, trust: 20, type: 'balanced' },
                    { text: '"현실적으로 생각하면 돈이 먼저예요. 돈 없이는 사랑도 유지하기 어렵다고 생각해요. 먹고살아야 사랑도 하죠"', affection: -15, trust: -18, type: 'money' }
                ]
            },
            {
                id: 'values_honesty',
                situation: '"진실이 항상 옳을까요? 때로는 거짓말이 상대를 지켜줄 수도 있잖아요. 이 문제에 대해 당신은 어떻게 생각하세요?"',
                choices: [
                    { text: '"상황에 따라 다르다고 생각해요. 대부분은 진실을 말해야 하지만, 상대를 지키기 위한 선의의 거짓말은 필요할 때도 있죠. 중요한 건 의도예요"', affection: 12, trust: 22, type: 'situational' },
                    { text: '"어떤 상황이든 진실이 최우선이에요. 순간은 힘들어도 장기적으로는 진실이 최선이라고 믿어요. 거짓말은 결국 더 큰 상처를 만들죠"', affection: 10, trust: 26, type: 'honest' },
                    { text: '"솔직히 거짓말도 살면서 필요한 기술이에요. 모든 걸 솔직하게 말하면 사람들이 상처받잖아요. 적당한 거짓말은 사회생활에 필요해요"', affection: -8, trust: -20, type: 'dishonest' }
                ]
            },
            {
                id: 'values_family',
                situation: '"당신에게 가족은 얼마나 중요한 존재인가요? 사람마다 가족에 대한 생각이 다르잖아요. 당신의 솔직한 생각이 궁금해요"',
                choices: [
                    { text: '"가족은 당연히 제일 중요하죠. 세상 누구보다 소중한 사람들이에요. 어떤 일이 있어도 가족을 최우선으로 생각하고 싶어요"', affection: 18, trust: 24, type: 'family_first' },
                    { text: '"가족도 물론 중요하지만, 제 자신도 똑같이 중요하다고 생각해요. 가족을 위해 희생도 하지만, 제 삶도 소중히 해야 한다고 봐요"', affection: 14, trust: 20, type: 'balanced' },
                    { text: '"솔직히 제 인생이 우선이에요. 가족도 소중하지만, 결국 제 삶은 제가 책임지는 거니까 제 선택과 행복이 먼저라고 생각해요"', affection: -12, trust: -15, type: 'selfish' }
                ]
            },
            {
                id: 'values_friendship',
                situation: '"친구 관계를 어떻게 생각하세요? 어떤 사람은 평생 친구가 중요하다고 하고, 어떤 사람은 각자의 삶이 우선이라고 하잖아요"',
                choices: [
                    { text: '"친구는 평생 소중히 지켜야 할 관계라고 생각해요. 힘들 때 서로 의지하고, 좋을 때 함께 기뻐할 수 있는 친구들은 정말 귀한 존재죠"', affection: 16, trust: 22, type: 'loyal' },
                    { text: '"친구 관계도 서로에게 도움이 되고 긍정적인 영향을 줄 때 의미있다고 봐요. 무조건적인 희생보다는 서로 윈윈하는 관계가 건강하죠"', affection: 12, trust: 18, type: 'practical' },
                    { text: '"솔직히 필요할 때 만나고 각자 바쁘면 안 만나는 게 현실 아닌가요? 억지로 관계 유지하는 것보다 자연스럽게 필요할 때만 만나는 게 낫죠"', affection: -10, trust: -15, type: 'opportunistic' }
                ]
            },
            {
                id: 'values_forgiveness',
                situation: '"용서하기 어려운 일도 용서해야 할까요?"',
                choices: [
                    { text: '"용서는 자신을 위한 것이에요"', affection: 16, trust: 24, type: 'forgiving' },
                    { text: '"잘못에 따라 다르죠"', affection: 14, trust: 22, type: 'conditional' },
                    { text: '"용서 못 할 것도 있어요"', affection: 12, trust: 20, type: 'strict' }
                ]
            },
            {
                id: 'values_justice',
                situation: '"정의가 뭐라고 생각해요?"',
                choices: [
                    { text: '"약자를 보호하는 것"', affection: 18, trust: 24, type: 'protection' },
                    { text: '"공정한 것"', affection: 16, trust: 26, type: 'fairness' },
                    { text: '"힘이 정의예요"', affection: -15, trust: -20, type: 'power' }
                ]
            },
            {
                id: 'values_work_life',
                situation: '"일과 삶의 균형, 어떻게 생각해요?"',
                choices: [
                    { text: '"삶이 우선이죠"', affection: 18, trust: 20, type: 'life' },
                    { text: '"균형이 중요해요"', affection: 16, trust: 24, type: 'balance' },
                    { text: '"일을 열심히 해야죠"', affection: 10, trust: 18, type: 'work' }
                ]
            },
            {
                id: 'values_change',
                situation: '"사람은 변할 수 있을까요?"',
                choices: [
                    { text: '"노력하면 변할 수 있어요"', affection: 18, trust: 24, type: 'optimistic' },
                    { text: '"어렵지만 가능해요"', affection: 14, trust: 22, type: 'realistic' },
                    { text: '"사람은 안 변해요"', affection: -10, trust: -12, type: 'pessimistic' }
                ]
            },
            {
                id: 'values_happiness',
                situation: '"행복이 뭐라고 생각해요?"',
                choices: [
                    { text: '"사랑하는 사람들과 함께 있는 것"', affection: 22, trust: 24, type: 'relationship' },
                    { text: '"자신이 원하는 것을 하는 것"', affection: 16, trust: 22, type: 'freedom' },
                    { text: '"돈과 안정"', affection: -8, trust: -10, type: 'material' }
                ]
            },
            {
                id: 'values_loyalty',
                situation: '"충성과 정직함 중 뭐가 더 중요해요?"',
                choices: [
                    { text: '"정직함이요"', affection: 14, trust: 28, type: 'honesty' },
                    { text: '"상황에 따라 다르죠"', affection: 12, trust: 24, type: 'situational' },
                    { text: '"충성이 우선이에요"', affection: 16, trust: 20, type: 'loyalty' }
                ]
            },
            {
                id: 'values_nature',
                situation: '"환경 보호, 어떻게 생각해요?"',
                choices: [
                    { text: '"정말 중요해요. 실천하려고 해요"', affection: 18, trust: 24, type: 'active' },
                    { text: '"중요하다고 생각해요"', affection: 14, trust: 20, type: 'aware' },
                    { text: '"별로 신경 안 써요"', affection: -15, trust: -18, type: 'indifferent' }
                ]
            },
            {
                id: 'values_religion',
                situation: '"종교가 필요하다고 생각해요?"',
                choices: [
                    { text: '"개인의 선택이에요"', affection: 18, trust: 26, type: 'respectful' },
                    { text: '"도움이 될 수 있죠"', affection: 14, trust: 22, type: 'positive' },
                    { text: '"필요없어요"', affection: -10, trust: -12, type: 'negative' }
                ]
            },
            {
                id: 'values_sacrifice',
                situation: '"사랑하는 사람을 위해 희생할 수 있어요?"',
                choices: [
                    { text: '"당연하죠"', affection: 24, trust: 26, type: 'devoted' },
                    { text: '"상황에 따라요"', affection: 16, trust: 24, type: 'conditional' },
                    { text: '"제가 우선이에요"', affection: -15, trust: -18, type: 'selfish' }
                ]
            },
            {
                id: 'values_truth',
                situation: '"작은 거짓말도 안 된다고 생각해요?"',
                choices: [
                    { text: '"상황에 따라 다르죠"', affection: 16, trust: 24, type: 'flexible' },
                    { text: '"거짓말은 안 좋아요"', affection: 14, trust: 28, type: 'honest' },
                    { text: '"필요하면 괜찮아요"', affection: -8, trust: -20, type: 'lenient' }
                ]
            },
            {
                id: 'values_education',
                situation: '"교육이 중요하다고 생각해요?"',
                choices: [
                    { text: '"정말 중요하죠"', affection: 16, trust: 24, type: 'important' },
                    { text: '"경험도 중요해요"', affection: 18, trust: 22, type: 'balanced' },
                    { text: '"별로 중요하지 않아요"', affection: -12, trust: -15, type: 'dismissive' }
                ]
            },
            {
                id: 'values_pride',
                situation: '"자존심과 사랑 중 뭐가 중요해요?"',
                choices: [
                    { text: '"사랑이 우선이죠"', affection: 22, trust: 24, type: 'love' },
                    { text: '"둘 다 중요해요"', affection: 14, trust: 22, type: 'balanced' },
                    { text: '"자존심이요"', affection: -15, trust: -18, type: 'pride' }
                ]
            },
            {
                id: 'values_tradition',
                situation: '"전통을 지키는 게 중요해요?"',
                choices: [
                    { text: '"의미 있는 것은 지켜야죠"', affection: 16, trust: 24, type: 'selective' },
                    { text: '"중요하지만 변화도 필요해요"', affection: 18, trust: 26, type: 'progressive' },
                    { text: '"별로 중요하지 않아요"', affection: -10, trust: -12, type: 'dismissive' }
                ]
            },
            {
                id: 'values_equality',
                situation: '"남녀 평등, 어떻게 생각해요?"',
                choices: [
                    { text: '"당연히 평등해야죠"', affection: 20, trust: 28, type: 'equal' },
                    { text: '"역할이 다를 뿐이에요"', affection: 12, trust: 20, type: 'different' },
                    { text: '"남자/여자가 우위예요"', affection: -25, trust: -30, type: 'sexist' }
                ]
            },
            {
                id: 'values_age',
                situation: '"나이가 중요하다고 생각해요?"',
                choices: [
                    { text: '"중요하지 않아요"', affection: 18, trust: 22, type: 'irrelevant' },
                    { text: '"어느 정도는 고려해야죠"', affection: 14, trust: 24, type: 'moderate' },
                    { text: '"중요해요"', affection: -10, trust: -12, type: 'important' }
                ]
            },
            {
                id: 'values_privacy',
                situation: '"프라이버시가 얼마나 중요해요?"',
                choices: [
                    { text: '"정말 중요해요"', affection: 14, trust: 28, type: 'important' },
                    { text: '"적당히 필요해요"', affection: 16, trust: 24, type: 'moderate' },
                    { text: '"숨길 게 뭐 있어요?"', affection: -12, trust: -15, type: 'dismissive' }
                ]
            },
            {
                id: 'values_wealth',
                situation: '"부자가 되고 싶어요?"',
                choices: [
                    { text: '"행복하면 돼요"', affection: 20, trust: 22, type: 'content' },
                    { text: '"안정적이면 좋겠어요"', affection: 16, trust: 24, type: 'stable' },
                    { text: '"꼭 부자 되고 싶어요"', affection: -8, trust: -10, type: 'greedy' }
                ]
            },
            {
                id: 'values_fame',
                situation: '"유명해지고 싶어요?"',
                choices: [
                    { text: '"아니요, 평범이 좋아요"', affection: 18, trust: 24, type: 'humble' },
                    { text: '"조금은요"', affection: 14, trust: 20, type: 'moderate' },
                    { text: '"꼭 유명해지고 싶어요"', affection: -10, trust: -12, type: 'fame_seeking' }
                ]
            },
            {
                id: 'values_revenge',
                situation: '"복수하는 게 정당화될 수 있을까요?"',
                choices: [
                    { text: '"복수는 해결책이 아니에요"', affection: 20, trust: 26, type: 'forgiving' },
                    { text: '"상황에 따라 다르죠"', affection: 14, trust: 22, type: 'situational' },
                    { text: '"눈에는 눈"', affection: -12, trust: -15, type: 'vengeful' }
                ]
            },
            {
                id: 'values_charity',
                situation: '"기부를 자주 해요?"',
                choices: [
                    { text: '"할 수 있을 때 해요"', affection: 18, trust: 24, type: 'charitable' },
                    { text: '"가끔요"', affection: 14, trust: 20, type: 'occasional' },
                    { text: '"제 돈이 우선이에요"', affection: -15, trust: -18, type: 'selfish' }
                ]
            },
            {
                id: 'values_competition',
                situation: '"경쟁이 필요하다고 생각해요?"',
                choices: [
                    { text: '"협력이 더 중요해요"', affection: 18, trust: 24, type: 'cooperative' },
                    { text: '"적당한 경쟁은 필요해요"', affection: 16, trust: 26, type: 'balanced' },
                    { text: '"경쟁이 발전시켜요"', affection: 12, trust: 22, type: 'competitive' }
                ]
            },
            {
                id: 'values_past',
                situation: '"과거를 잊어야 할까요?"',
                choices: [
                    { text: '"배우고 앞으로 나아가야죠"', affection: 18, trust: 26, type: 'learn' },
                    { text: '"완전히 잊긴 어려워요"', affection: 16, trust: 24, type: 'realistic' },
                    { text: '"과거는 과거예요"', affection: 12, trust: 20, type: 'forward' }
                ]
            },
            {
                id: 'values_risk',
                situation: '"위험을 감수할 가치가 있을까요?"',
                choices: [
                    { text: '"신중하게 판단해야죠"', affection: 16, trust: 26, type: 'careful' },
                    { text: '"때로는 필요해요"', affection: 18, trust: 24, type: 'moderate' },
                    { text: '"안전이 우선이에요"', affection: 14, trust: 22, type: 'safe' }
                ]
            },
            {
                id: 'values_beauty',
                situation: '"외모가 얼마나 중요해요?"',
                choices: [
                    { text: '"내면이 더 중요하죠"', affection: 22, trust: 26, type: 'inner' },
                    { text: '"둘 다 중요해요"', affection: 16, trust: 24, type: 'balanced' },
                    { text: '"외모가 중요해요"', affection: -15, trust: -18, type: 'shallow' }
                ]
            },
            {
                id: 'values_promises',
                situation: '"약속은 꼭 지켜야 할까요?"',
                choices: [
                    { text: '"당연하죠"', affection: 18, trust: 30, type: 'reliable' },
                    { text: '"최선을 다해야죠"', affection: 16, trust: 28, type: 'effort' },
                    { text: '"상황 따라요"', affection: -10, trust: -20, type: 'unreliable' }
                ]
            },
            {
                id: 'values_ambition',
                situation: '"야망이 있어요?"',
                choices: [
                    { text: '"행복한 삶이 목표예요"', affection: 18, trust: 22, type: 'content' },
                    { text: '"이루고 싶은 게 있어요"', affection: 16, trust: 26, type: 'ambitious' },
                    { text: '"큰 욕심 없어요"', affection: 12, trust: 18, type: 'passive' }
                ]
            },
            {
                id: 'values_independence',
                situation: '"독립성이 중요해요?"',
                choices: [
                    { text: '"중요하지만 의지할 수도 있어야죠"', affection: 18, trust: 26, type: 'balanced' },
                    { text: '"정말 중요해요"', affection: 14, trust: 28, type: 'independent' },
                    { text: '"서로 의지하는 게 좋아요"', affection: 20, trust: 22, type: 'interdependent' }
                ]
            },
            {
                id: 'values_spontaneity',
                situation: '"계획적인 게 좋아요, 즉흥적인 게 좋아요?"',
                choices: [
                    { text: '"둘 다 좋아요"', affection: 18, trust: 24, type: 'flexible' },
                    { text: '"계획적인 게 좋아요"', affection: 14, trust: 26, type: 'planned' },
                    { text: '"즉흥적인 게 재미있어요"', affection: 16, trust: 20, type: 'spontaneous' }
                ]
            },
            {
                id: 'values_perfection',
                situation: '"완벽주의자예요?"',
                choices: [
                    { text: '"아니요, 적당히가 좋아요"', affection: 16, trust: 22, type: 'relaxed' },
                    { text: '"어느 정도요"', affection: 14, trust: 24, type: 'moderate' },
                    { text: '"완벽해야 해요"', affection: -10, trust: -12, type: 'perfectionist' }
                ]
            },
            {
                id: 'values_humor',
                situation: '"유머감각이 중요해요?"',
                choices: [
                    { text: '"정말 중요하죠"', affection: 20, trust: 22, type: 'important' },
                    { text: '"있으면 좋죠"', affection: 16, trust: 20, type: 'nice' },
                    { text: '"별로 안 중요해요"', affection: -12, trust: -14, type: 'serious' }
                ]
            },
            {
                id: 'values_animals',
                situation: '"동물 권리를 어떻게 생각해요?"',
                choices: [
                    { text: '"정말 중요해요"', affection: 20, trust: 26, type: 'advocate' },
                    { text: '"보호받아야죠"', affection: 16, trust: 24, type: 'supportive' },
                    { text: '"별로 신경 안 써요"', affection: -18, trust: -20, type: 'indifferent' }
                ]
            },
            {
                id: 'values_growth',
                situation: '"자기계발이 중요해요?"',
                choices: [
                    { text: '"정말 중요하죠"', affection: 16, trust: 26, type: 'growth' },
                    { text: '"적당히요"', affection: 14, trust: 22, type: 'moderate' },
                    { text: '"현재가 좋아요"', affection: 12, trust: 18, type: 'content' }
                ]
            },
            {
                id: 'values_loyalty_test',
                situation: '"친구가 잘못했을 때 편들어줘야 해요?"',
                choices: [
                    { text: '"잘못은 잘못이에요"', affection: 14, trust: 28, type: 'principled' },
                    { text: '"상황 봐서요"', affection: 16, trust: 24, type: 'situational' },
                    { text: '"당연히 편들어야죠"', affection: 18, trust: 20, type: 'loyal' }
                ]
            },
            {
                id: 'values_death',
                situation: '"죽음에 대해 어떻게 생각해요?"',
                choices: [
                    { text: '"자연스러운 것이에요"', affection: 16, trust: 24, type: 'accepting' },
                    { text: '"무섭지만 피할 수 없죠"', affection: 14, trust: 22, type: 'realistic' },
                    { text: '"생각하기 싫어요"', affection: 12, trust: 18, type: 'avoiding' }
                ]
            },
            {
                id: 'values_legacy',
                situation: '"무엇을 남기고 싶어요?"',
                choices: [
                    { text: '"좋은 기억이요"', affection: 20, trust: 24, type: 'memories' },
                    { text: '"긍정적 영향이요"', affection: 18, trust: 26, type: 'impact' },
                    { text: '"별로 생각 안 해봤어요"', affection: 10, trust: 18, type: 'indifferent' }
                ]
            }
        ]
    },
    lifestyle: {
        id: 'lifestyle',
        name: '일상 취향',
        icon: '☕',
        stamina: 13,
        baseAffection: 3,
        baseTrust: 3,
        description: '일상의 작은 취향들을 공유합니다',
        scenarios: [
            {
                id: 'lifestyle_morning',
                situation: '"아침형인가요 저녁형인가요?"',
                choices: [
                    { text: '"아침형이에요. 당신은요?"', affection: 14, trust: 14, type: 'morning' },
                    { text: '"저녁형이에요"', affection: 14, trust: 14, type: 'night' },
                    { text: '"둘 다 힘들어요"', affection: -6, trust: -8, type: 'neither' }
                ]
            },
            {
                id: 'lifestyle_coffee',
                situation: '"커피 좋아해요?"',
                choices: [
                    { text: '"네, 매일 마셔요"', affection: 14, trust: 14, type: 'love' },
                    { text: '"가끔요"', affection: 12, trust: 12, type: 'sometimes' },
                    { text: '"안 마셔요"', affection: 10, trust: 10, type: 'no' }
                ]
            },
            {
                id: 'lifestyle_sleep',
                situation: '"몇 시에 자요?"',
                choices: [
                    { text: '"일찍 자요"', affection: 14, trust: 14, type: 'early' },
                    { text: '"늦게 자요"', affection: 12, trust: 12, type: 'late' },
                    { text: '"불규칙해요"', affection: 10, trust: 10, type: 'irregular' }
                ]
            },
            {
                id: 'lifestyle_exercise',
                situation: '"운동 자주 해요?"',
                choices: [
                    { text: '"네, 규칙적으로 해요"', affection: 16, trust: 16, type: 'regular' },
                    { text: '"가끔요"', affection: 14, trust: 14, type: 'sometimes' },
                    { text: '"안 해요"', affection: -6, trust: -8, type: 'no' }
                ]
            },
            {
                id: 'lifestyle_food',
                situation: '"매운 음식 좋아해요?"',
                choices: [
                    { text: '"정말 좋아해요!"', affection: 14, trust: 14, type: 'love' },
                    { text: '"적당히요"', affection: 12, trust: 12, type: 'moderate' },
                    { text: '"못 먹어요"', affection: 10, trust: 10, type: 'no' }
                ]
            },
            {
                id: 'lifestyle_music',
                situation: '"음악 자주 들어요?"',
                choices: [
                    { text: '"항상 들어요"', affection: 16, trust: 14, type: 'always' },
                    { text: '"가끔요"', affection: 14, trust: 12, type: 'sometimes' },
                    { text: '"별로 안 들어요"', affection: -6, trust: -8, type: 'rarely' }
                ]
            },
            {
                id: 'lifestyle_weather',
                situation: '"어떤 날씨 좋아해요?"',
                choices: [
                    { text: '"화창한 날이요"', affection: 14, trust: 12, type: 'sunny' },
                    { text: '"비 오는 날이요"', affection: 16, trust: 14, type: 'rainy' },
                    { text: '"눈 오는 날이요"', affection: 18, trust: 16, type: 'snowy' }
                ]
            },
            {
                id: 'lifestyle_season',
                situation: '"좋아하는 계절이 있어요?"',
                choices: [
                    { text: '"봄이요"', affection: 16, trust: 14, type: 'spring' },
                    { text: '"여름이요"', affection: 14, trust: 12, type: 'summer' },
                    { text: '"가을이요"', affection: 16, trust: 14, type: 'fall' }
                ]
            },
            {
                id: 'lifestyle_indoor',
                situation: '"집순이/집돌이예요?"',
                choices: [
                    { text: '"네, 집이 좋아요"', affection: 14, trust: 14, type: 'homebody' },
                    { text: '"밖이 좋아요"', affection: 16, trust: 14, type: 'outdoor' },
                    { text: '"둘 다 좋아요"', affection: 18, trust: 16, type: 'both' }
                ]
            },
            {
                id: 'lifestyle_movie',
                situation: '"영화관 vs 집에서 넷플릭스?"',
                choices: [
                    { text: '"영화관이 좋아요"', affection: 16, trust: 14, type: 'theater' },
                    { text: '"집에서 편하게요"', affection: 14, trust: 14, type: 'home' },
                    { text: '"둘 다 좋아요"', affection: 18, trust: 16, type: 'both' }
                ]
            },
            {
                id: 'lifestyle_shower',
                situation: '"아침 샤워 vs 저녁 샤워?"',
                choices: [
                    { text: '"아침이요"', affection: 14, trust: 14, type: 'morning' },
                    { text: '"저녁이요"', affection: 14, trust: 14, type: 'evening' },
                    { text: '"둘 다 해요"', affection: 16, trust: 16, type: 'both' }
                ]
            },
            {
                id: 'lifestyle_cleaning',
                situation: '"청소 자주 해요?"',
                choices: [
                    { text: '"매일 해요"', affection: 18, trust: 18, type: 'daily' },
                    { text: '"주기적으로요"', affection: 16, trust: 16, type: 'regular' },
                    { text: '"가끔..."', affection: -8, trust: -10, type: 'rarely' }
                ]
            },
            {
                id: 'lifestyle_phone',
                situation: '"스마트폰 사용 시간이 얼마나 돼요?"',
                choices: [
                    { text: '"많이 써요"', affection: 10, trust: 12, type: 'heavy' },
                    { text: '"적당히요"', affection: 16, trust: 16, type: 'moderate' },
                    { text: '"별로 안 써요"', affection: 14, trust: 14, type: 'light' }
                ]
            },
            {
                id: 'lifestyle_sns',
                situation: '"SNS 자주 해요?"',
                choices: [
                    { text: '"네, 자주요"', affection: 12, trust: 12, type: 'active' },
                    { text: '"가끔 봐요"', affection: 14, trust: 14, type: 'sometimes' },
                    { text: '"안 해요"', affection: 16, trust: 16, type: 'no' }
                ]
            },
            {
                id: 'lifestyle_shopping',
                situation: '"쇼핑 좋아해요?"',
                choices: [
                    { text: '"정말 좋아해요"', affection: 14, trust: 12, type: 'love' },
                    { text: '"필요할 때만요"', affection: 16, trust: 16, type: 'practical' },
                    { text: '"싫어요"', affection: 12, trust: 14, type: 'dislike' }
                ]
            },
            {
                id: 'lifestyle_cooking_home',
                situation: '"집에서 요리 자주 해요?"',
                choices: [
                    { text: '"거의 매일요"', affection: 18, trust: 18, type: 'often' },
                    { text: '"가끔요"', affection: 14, trust: 14, type: 'sometimes' },
                    { text: '"거의 안 해요"', affection: -6, trust: -8, type: 'rarely' }
                ]
            },
            {
                id: 'lifestyle_delivery',
                situation: '"배달 음식 자주 시켜요?"',
                choices: [
                    { text: '"자주요"', affection: 10, trust: 10, type: 'often' },
                    { text: '"가끔요"', affection: 14, trust: 14, type: 'sometimes' },
                    { text: '"거의 안 해요"', affection: 16, trust: 16, type: 'rarely' }
                ]
            },
            {
                id: 'lifestyle_pet_home',
                situation: '"반려동물 키워요?"',
                choices: [
                    { text: '"네, 키워요"', affection: 16, trust: 16, type: 'yes' },
                    { text: '"키우고 싶어요"', affection: 18, trust: 14, type: 'want' },
                    { text: '"아니요"', affection: 10, trust: 10, type: 'no' }
                ]
            },
            {
                id: 'lifestyle_plant',
                situation: '"식물 키워요?"',
                choices: [
                    { text: '"네, 여러 개요"', affection: 16, trust: 16, type: 'yes' },
                    { text: '"키우고 싶어요"', affection: 14, trust: 14, type: 'want' },
                    { text: '"다 죽여요..."', affection: -6, trust: -8, type: 'no' }
                ]
            },
            {
                id: 'lifestyle_color',
                situation: '"좋아하는 색이 있어요?"',
                choices: [
                    { text: '"파란색이요"', affection: 14, trust: 12, type: 'blue' },
                    { text: '"빨간색이요"', affection: 14, trust: 12, type: 'red' },
                    { text: '"검은색이요"', affection: 12, trust: 12, type: 'black' }
                ]
            },
            {
                id: 'lifestyle_temperature',
                situation: '"더운 거 좋아해요, 추운 거?"',
                choices: [
                    { text: '"더운 게 좋아요"', affection: 14, trust: 12, type: 'hot' },
                    { text: '"추운 게 좋아요"', affection: 14, trust: 12, type: 'cold' },
                    { text: '"적당한 게 좋아요"', affection: 16, trust: 14, type: 'moderate' }
                ]
            },
            {
                id: 'lifestyle_dessert',
                situation: '"디저트 좋아해요?"',
                choices: [
                    { text: '"정말 좋아해요!"', affection: 16, trust: 14, type: 'love' },
                    { text: '"가끔요"', affection: 14, trust: 14, type: 'sometimes' },
                    { text: '"별로예요"', affection: -6, trust: -8, type: 'no' }
                ]
            },
            {
                id: 'lifestyle_alcohol',
                situation: '"술 자주 마셔요?"',
                choices: [
                    { text: '"가끔 마셔요"', affection: 14, trust: 14, type: 'sometimes' },
                    { text: '"거의 안 마셔요"', affection: 16, trust: 16, type: 'rarely' },
                    { text: '"자주 마셔요"', affection: -8, trust: -10, type: 'often' }
                ]
            },
            {
                id: 'lifestyle_driving',
                situation: '"운전 좋아해요?"',
                choices: [
                    { text: '"네, 좋아해요"', affection: 14, trust: 14, type: 'yes' },
                    { text: '"할 줄만 알아요"', affection: 12, trust: 12, type: 'can' },
                    { text: '"못 해요"', affection: 10, trust: 10, type: 'no' }
                ]
            },
            {
                id: 'lifestyle_public_transport',
                situation: '"대중교통 vs 차?"',
                choices: [
                    { text: '"대중교통이요"', affection: 14, trust: 14, type: 'public' },
                    { text: '"차요"', affection: 14, trust: 14, type: 'car' },
                    { text: '"걸어요"', affection: 16, trust: 16, type: 'walk' }
                ]
            },
            {
                id: 'lifestyle_earlybird',
                situation: '"일찍 일어나는 편이에요?"',
                choices: [
                    { text: '"네, 새벽형이에요"', affection: 16, trust: 16, type: 'early' },
                    { text: '"적당히요"', affection: 14, trust: 14, type: 'moderate' },
                    { text: '"늦게 일어나요"', affection: -6, trust: -8, type: 'late' }
                ]
            },
            {
                id: 'lifestyle_planning',
                situation: '"계획 세우는 거 좋아해요?"',
                choices: [
                    { text: '"정말 좋아해요"', affection: 16, trust: 18, type: 'yes' },
                    { text: '"필요할 때만요"', affection: 14, trust: 16, type: 'sometimes' },
                    { text: '"즉흥적인 게 좋아요"', affection: 12, trust: 12, type: 'spontaneous' }
                ]
            },
            {
                id: 'lifestyle_saving',
                situation: '"저축 잘해요?"',
                choices: [
                    { text: '"네, 계획적이에요"', affection: 18, trust: 22, type: 'yes' },
                    { text: '"노력 중이에요"', affection: 16, trust: 20, type: 'trying' },
                    { text: '"잘 못해요..."', affection: -8, trust: -10, type: 'no' }
                ]
            },
            {
                id: 'lifestyle_fashion',
                situation: '"패션에 관심 있어요?"',
                choices: [
                    { text: '"정말 관심 많아요"', affection: 14, trust: 12, type: 'yes' },
                    { text: '"적당히요"', affection: 16, trust: 14, type: 'moderate' },
                    { text: '"별로예요"', affection: -6, trust: -8, type: 'no' }
                ]
            },
            {
                id: 'lifestyle_perfume',
                situation: '"향수 뿌려요?"',
                choices: [
                    { text: '"매일 뿌려요"', affection: 16, trust: 14, type: 'daily' },
                    { text: '"특별한 날만요"', affection: 14, trust: 14, type: 'special' },
                    { text: '"안 뿌려요"', affection: 10, trust: 10, type: 'no' }
                ]
            },
            {
                id: 'lifestyle_organization',
                situation: '"정리정돈 잘해요?"',
                choices: [
                    { text: '"완벽하게 해요"', affection: 18, trust: 20, type: 'perfect' },
                    { text: '"적당히요"', affection: 16, trust: 18, type: 'moderate' },
                    { text: '"잘 못해요..."', affection: -10, trust: -12, type: 'messy' }
                ]
            },
            {
                id: 'lifestyle_noise',
                situation: '"조용한 게 좋아요?"',
                choices: [
                    { text: '"네, 조용한 게 좋아요"', affection: 14, trust: 16, type: 'quiet' },
                    { text: '"적당한 소음은 괜찮아요"', affection: 16, trust: 14, type: 'moderate' },
                    { text: '"시끄러운 게 좋아요"', affection: 12, trust: 10, type: 'noisy' }
                ]
            },
            {
                id: 'lifestyle_reading_time',
                situation: '"언제 책 읽어요?"',
                choices: [
                    { text: '"자기 전이요"', affection: 16, trust: 16, type: 'night' },
                    { text: '"아침이요"', affection: 14, trust: 14, type: 'morning' },
                    { text: '"안 읽어요"', affection: -6, trust: -8, type: 'no' }
                ]
            },
            {
                id: 'lifestyle_weekend',
                situation: '"주말에 뭐 해요?"',
                choices: [
                    { text: '"쉬어요"', affection: 14, trust: 14, type: 'rest' },
                    { text: '"나가서 놀아요"', affection: 16, trust: 14, type: 'out' },
                    { text: '"일해요"', affection: -8, trust: -10, type: 'work' }
                ]
            },
            {
                id: 'lifestyle_stress',
                situation: '"스트레스 어떻게 풀어요?"',
                choices: [
                    { text: '"운동해요"', affection: 18, trust: 18, type: 'exercise' },
                    { text: '"영화 봐요"', affection: 16, trust: 16, type: 'movie' },
                    { text: '"자요"', affection: 14, trust: 14, type: 'sleep' }
                ]
            },
            {
                id: 'lifestyle_social',
                situation: '"사교적인 편이에요?"',
                choices: [
                    { text: '"네, 사람 만나는 거 좋아요"', affection: 16, trust: 14, type: 'social' },
                    { text: '"적당히요"', affection: 14, trust: 14, type: 'moderate' },
                    { text: '"혼자 있는 게 좋아요"', affection: 12, trust: 14, type: 'introvert' }
                ]
            },
            {
                id: 'lifestyle_punctual',
                situation: '"시간 잘 지켜요?"',
                choices: [
                    { text: '"항상 일찍 가요"', affection: 20, trust: 24, type: 'early' },
                    { text: '"정각에 가요"', affection: 18, trust: 22, type: 'ontime' },
                    { text: '"가끔 늦어요..."', affection: -12, trust: -15, type: 'late' }
                ]
            },
            {
                id: 'lifestyle_smartphone',
                situation: '"스마트폰 없으면 불안해요?"',
                choices: [
                    { text: '"괜찮아요"', affection: 16, trust: 18, type: 'fine' },
                    { text: '"조금 불안해요"', affection: 14, trust: 16, type: 'anxious' },
                    { text: '"정말 불안해요"', affection: -8, trust: -10, type: 'very_anxious' }
                ]
            },
            {
                id: 'lifestyle_communication',
                situation: '"전화 vs 문자?"',
                choices: [
                    { text: '"전화가 좋아요"', affection: 16, trust: 16, type: 'call' },
                    { text: '"문자가 좋아요"', affection: 14, trust: 14, type: 'text' },
                    { text: '"둘 다 괜찮아요"', affection: 18, trust: 18, type: 'both' }
                ]
            },
            {
                id: 'lifestyle_routine',
                situation: '"루틴이 있어요?"',
                choices: [
                    { text: '"네, 철저해요"', affection: 16, trust: 20, type: 'strict' },
                    { text: '"적당히요"', affection: 14, trust: 18, type: 'moderate' },
                    { text: '"없어요"', affection: -6, trust: -8, type: 'no' }
                ]
            }
        ]
    }
};

// 돈 벌기 옵션
const WORK_OPTIONS = {
    convenience: {
        id: 'convenience',
        name: '편의점 알바',
        icon: '🏪',
        stamina: 25,
        money: 50000,
        maxPerDay: 3,
        description: '편한 실내 알바, 낮은 수익'
    },
    tutoring: {
        id: 'tutoring',
        name: '과외',
        icon: '📚',
        stamina: 35,
        money: 100000,
        maxPerDay: 2,
        description: '머리를 써야 하지만 수익이 좋음'
    },
    construction: {
        id: 'construction',
        name: '건설 일용직',
        icon: '🏗️',
        stamina: 55,
        money: 150000,
        maxPerDay: 1,
        description: '힘들지만 돈을 많이 벌 수 있음'
    },
    freelance: {
        id: 'freelance',
        name: '프리랜서',
        icon: '💻',
        stamina: 40,
        minMoney: 80000,
        maxMoney: 200000,
        maxPerDay: 2,
        description: '성과에 따라 수익이 변동됨'
    },
    stock: {
        id: 'stock',
        name: '주식 투자',
        icon: '📈',
        stamina: 15,
        investMin: 50000,
        investMax: 200000,
        maxPerDay: 1,
        description: '리스크가 크지만 큰 수익 가능'
    },
    delivery: {
        id: 'delivery',
        name: '배달 아르바이트',
        icon: '🛵',
        stamina: 45,
        money: 120000,
        maxPerDay: 2,
        description: '체력 소모가 크지만 수익이 괜찮음'
    }
};

// ============================================
// 스킨십 옵션
const SKINSHIP_OPTIONS = {
    handhold: {
        id: 'handhold',
        name: '손 잡기',
        icon: '🤝',
        minAffection: 30,
        stamina: 10,
        baseAffection: 8,
        baseTrust: 5,
        description: '부담스럽지 않은 스킨십',
        successRate: 0.9  // 호감도 충족 시 90% 성공
    },
    hug: {
        id: 'hug',
        name: '포옹하기',
        icon: '🤗',
        minAffection: 50,
        stamina: 15,
        baseAffection: 15,
        baseTrust: 10,
        description: '조금 더 친밀한 스킨십',
        successRate: 0.8
    },
    kiss: {
        id: 'kiss',
        name: '키스하기',
        icon: '💋',
        minAffection: 70,
        stamina: 20,
        baseAffection: 25,
        baseTrust: 15,
        description: '로맨틱한 스킨십',
        successRate: 0.7
    },
    trip: {
        id: 'trip',
        name: '1박2일 여행 제안',
        icon: '✈️',
        minAffection: 85,
        stamina: 30,
        money: 1000000,  // 100만원으로 변경
        baseAffection: 35,
        baseTrust: 25,
        description: '아주 친밀한 관계에서만 가능 (비용: 100만원)',
        successRate: 0.6
    }
};

// ============================================
// 돌발 상황 이벤트 (더 미묘하고 어렵게, 호감도 하락 이벤트 포함)
// ============================================
const CRISIS_EVENTS = [
    {
        id: 'jealousy',
        situation: '거리를 걷다가 당신의 전 연인과 마주쳤습니다. 상대방이 불편한 표정을 짓습니다.',
        choices: [
            { text: '상황을 솔직하게 설명하고 오해를 풀려고 노력한다.', affection: 10, trust: 20, type: 'honest' },
            { text: '가볍게 인사만 하고 빠르게 자리를 피한다.', affection: 5, trust: 8, type: 'avoid' },
            { text: '전 연인을 완전히 무시하고 상대방만 신경쓴다.', affection: 8, trust: -10, type: 'ignore' }
        ]
    },
    {
        id: 'late',
        situation: '약속 시간에 30분 늦었습니다. 상대방이 화난 표정으로 기다리고 있습니다.',
        choices: [
            { text: '진심으로 사과하고 다시는 늦지 않겠다고 약속한다.', affection: 3, trust: 12, type: 'apologize' },
            { text: '교통 상황을 설명하며 어쩔 수 없었다고 말한다.', affection: -5, trust: -12, type: 'excuse' },
            { text: '선물을 사서 기분을 풀어드린다.', affection: 8, trust: -8, money: -50000, type: 'gift' }
        ]
    },
    {
        id: 'friend_badmouth',
        situation: '상대방의 친한 친구가 당신에 대해 안 좋게 이야기하는 것을 들었다고 합니다.',
        choices: [
            { text: '친구를 만나서 직접 대화하며 오해를 풀겠다고 한다.', affection: 12, trust: 18, type: 'proactive' },
            { text: '신경쓰지 말자고 위로하며 넘어간다.', affection: 5, trust: 5, type: 'comfort' },
            { text: '"그 친구가 질투하는 거 아닐까요?" 친구를 비난한다.', affection: -15, trust: -20, type: 'blame' }
        ]
    },
    {
        id: 'family_pressure',
        situation: '부모님이 만나자고 하십니다. 상대방이 긴장한 표정을 짓습니다.',
        choices: [
            { text: '부모님을 미리 만나 이야기를 나누고 준비한다.', affection: 8, trust: 22, type: 'prepare' },
            { text: '부모님께 시간을 좀 더 달라고 부탁한다.', affection: 5, trust: 8, type: 'delay' },
            { text: '"괜찮아요, 제 부모님 좋으신 분들이에요" 안심시킨다.', affection: 10, trust: 15, type: 'reassure' }
        ]
    },
    {
        id: 'work_overtime',
        situation: '상대방이 잦은 야근으로 지쳐있습니다. 이번 주에만 3번 약속을 취소했습니다.',
        choices: [
            { text: '"힘드시죠. 제가 응원할게요" 이해하고 지지한다.', affection: 8, trust: 20, type: 'supportive' },
            { text: '"저도 외롭지만 참을게요" 서운함을 조금 표현한다.', affection: 5, trust: 10, type: 'honest' },
            { text: '"저랑 약속이 그렇게 중요하지 않나요?" 섭섭함을 드러낸다.', affection: -12, trust: -15, type: 'complain' }
        ]
    },
    {
        id: 'forgot_anniversary',
        situation: '100일 기념일을 깜빡했습니다. 상대방이 실망한 표정입니다.',
        choices: [
            { text: '즉시 사과하고 특별한 선물을 준비한다.', affection: 8, trust: 5, money: -200000, type: 'compensate' },
            { text: '진심으로 사과하고 다음에 두 배로 보상하겠다고 약속한다.', affection: 5, trust: 12, type: 'promise' },
            { text: '"사실 준비했어요" 거짓말을 하고 급하게 준비한다.', affection: 10, trust: -18, money: -150000, type: 'lie' }
        ]
    },
    {
        id: 'sns_misunderstanding',
        situation: 'SNS에 다른 이성과 찍은 사진이 올라왔습니다. 상대방이 조용히 물어봅니다.',
        choices: [
            { text: '솔직하게 상황을 설명하고 오해를 푼다.', affection: 8, trust: 22, type: 'explain' },
            { text: '사진을 삭제하고 앞으로 조심하겠다고 한다.', affection: 5, trust: 12, type: 'delete' },
            { text: '"왜 SNS 감시해요?" 방어적으로 반응한다.', affection: -18, trust: -25, type: 'defensive' }
        ]
    },
    {
        id: 'messy_house',
        situation: '예고 없이 집에 놀러 왔는데, 집이 엉망입니다.',
        choices: [
            { text: '솔직하게 사과하고 빠르게 정리한다.', affection: 5, trust: 12, type: 'clean' },
            { text: '부끄러워하면서도 솔직하게 들어오라고 한다.', affection: 10, trust: 18, type: 'honest' },
            { text: '"미리 연락했어야죠" 상대방을 탓한다.', affection: -20, trust: -22, type: 'blame' }
        ]
    },
    {
        id: 'money_shortage',
        situation: '데이트 비용이 부족하다는 것을 깨달았습니다. 계산대 앞입니다.',
        choices: [
            { text: '솔직하게 말하고 다음에 갚겠다고 한다.', affection: -5, trust: 15, type: 'honest' },
            { text: '급하게 ATM을 찾으러 간다.', affection: -8, trust: 8, type: 'atm' },
            { text: '"카드가 이상한가봐요" 거짓말하고 다른 카드를 꺼낸다.', affection: 5, trust: -20, type: 'lie' }
        ]
    },
    {
        id: 'phone_addiction',
        situation: '상대방이 "요즘 저랑 있을 때 휴대폰만 보는 것 같아요"라고 말합니다.',
        choices: [
            { text: '진심으로 사과하고 휴대폰을 가방에 넣는다.', affection: 12, trust: 18, type: 'apologize' },
            { text: '"죄송해요, 급한 일이 있어서..." 변명한다.', affection: 0, trust: -8, type: 'excuse' },
            { text: '"저도 외로웠으면 좋겠어요" 역공한다.', affection: -15, trust: -20, type: 'counterattack' }
        ]
    },
    {
        id: 'weight_comment',
        situation: '상대방이 "요즘 제가 살 좀 찐 것 같죠?"라고 물어봅니다.',
        choices: [
            { text: '"그래도 여전히 예뻐요" 위로한다.', affection: -8, trust: 5, type: 'consolation' },
            { text: '"아니에요, 전혀요!" 단호하게 부정한다.', affection: 10, trust: -5, type: 'deny' },
            { text: '"건강이 제일 중요하죠. 같이 운동할까요?" 제안한다.', affection: 5, trust: 15, type: 'proactive' }
        ]
    },
    {
        id: 'ex_contact',
        situation: '전 연인에게서 연락이 왔습니다. 상대방이 눈치챈 것 같습니다.',
        choices: [
            { text: '바로 보여주며 "이상한 사람이네요" 함께 웃는다.', affection: 15, trust: 25, type: 'transparent' },
            { text: '무시하고 차단한다.', affection: 10, trust: 20, type: 'block' },
            { text: '몰래 답장하고 숨긴다.', affection: -25, trust: -35, type: 'hide' }
        ]
    },
    {
        id: 'fashion_disaster',
        situation: '오늘 상대방의 패션 센스가... 별로입니다. "어때요?"라고 물어봅니다.',
        choices: [
            { text: '"좋은데요?" 거짓말을 한다.', affection: 5, trust: -10, type: 'lie' },
            { text: '"이건 어떨까요?" 다른 옷을 권유한다.', affection: -5, trust: 15, type: 'suggest' },
            { text: '"당신이 입으면 다 예뻐요" 진심으로 말한다.', affection: 12, trust: 8, type: 'romantic' }
        ]
    },
    {
        id: 'parent_call',
        situation: '데이트 중 부모님에게서 전화가 왔습니다. "급한 일이에요"라고 하십니다.',
        choices: [
            { text: '"잠깐만요" 양해를 구하고 받는다.', affection: 5, trust: 18, type: 'polite' },
            { text: '나중에 다시 걸겠다고 문자를 보낸다.', affection: 8, trust: 10, type: 'text' },
            { text: '전화를 무시하고 계속 데이트한다.', affection: 10, trust: -15, type: 'ignore' }
        ]
    },
    {
        id: 'gift_reaction',
        situation: '상대방이 준 선물이 취향에 맞지 않습니다. "마음에 드세요?"라고 묻습니다.',
        choices: [
            { text: '"너무 좋아요! 감사합니다" 진심으로 기뻐한다.', affection: 15, trust: -5, type: 'pretend' },
            { text: '"감사한데, 제 스타일은 아니에요" 솔직하게 말한다.', affection: -10, trust: 20, type: 'honest' },
            { text: '"정성이 느껴져요. 소중히 쓸게요" 마음을 강조한다.', affection: 18, trust: 15, type: 'grateful' }
        ]
    },
    {
        id: 'drunk_call',
        situation: '밤 늦게 술 취한 상대방에게서 전화가 왔습니다. "보고싶어요..."',
        choices: [
            { text: '바로 데리러 간다.', affection: 20, trust: 15, type: 'rescue' },
            { text: '"택시 타고 집에 가세요. 내일 통화해요" 말한다.', affection: -5, trust: 10, type: 'rational' },
            { text: '전화를 받지 않고 잔다.', affection: -25, trust: -20, type: 'ignore' }
        ]
    },
    {
        id: 'career_vs_relationship',
        situation: '"당신 일이 더 중요해요, 저보다?" 상대방이 조용히 묻습니다.',
        choices: [
            { text: '"당신이 제일 중요해요" 즉시 답한다.', affection: 15, trust: -5, type: 'you_first' },
            { text: '"둘 다 소중해요. 균형을 맞추려고 노력할게요" 솔직하게 말한다.', affection: 5, trust: 20, type: 'balanced' },
            { text: '"일도 중요하지만 당신을 위해 조정할게요" 타협한다.', affection: 12, trust: 15, type: 'compromise' }
        ]
    },
    {
        id: 'comparison',
        situation: '상대방이 "전 애인은 어땠어요?"라고 물어봅니다.',
        choices: [
            { text: '"과거는 중요하지 않아요. 지금 당신이 최고예요" 말한다.', affection: 18, trust: 10, type: 'best' },
            { text: '"비교하고 싶지 않아요" 거절한다.', affection: 5, trust: 15, type: 'refuse' },
            { text: '솔직하게 과거를 이야기한다.', affection: -5, trust: 20, type: 'honest' }
        ]
    },
    {
        id: 'surprise_fail',
        situation: '준비한 깜짝 이벤트가 완전히 실패했습니다. 상대방이 당황한 표정입니다.',
        choices: [
            { text: '웃으며 "이것도 추억이죠?" 긍정적으로 넘긴다.', affection: 12, trust: 15, type: 'positive' },
            { text: '진심으로 사과한다.', affection: 5, trust: 18, type: 'apologize' },
            { text: '"준비한 사람 기분 생각 안 해요?" 화를 낸다.', affection: -20, trust: -25, type: 'angry' }
        ]
    },
    {
        id: 'sick_partner',
        situation: '상대방이 갑자기 아프다고 연락했습니다. 오늘은 중요한 회의가 있습니다.',
        choices: [
            { text: '회의를 취소하고 바로 간다.', affection: 20, trust: 10, type: 'immediate' },
            { text: '회의 후 바로 가겠다고 약속한다.', affection: 5, trust: 15, type: 'later' },
            { text: '"약 먹고 쉬세요. 내일 볼게요" 전화로 위로한다.', affection: -15, trust: -10, type: 'phone_only' }
        ]
    },
    {
        id: 'public_affection',
        situation: '사람이 많은 곳에서 상대방이 손을 잡으려 합니다. 주변 시선이 느껴집니다.',
        choices: [
            { text: '자연스럽게 손을 잡는다.', affection: 15, trust: 15, type: 'accept' },
            { text: '살짝 피하며 "나중에요" 속삭인다.', affection: -10, trust: -15, type: 'avoid' },
            { text: '손을 잡고 더 가까이 다가간다.', affection: 20, trust: 10, type: 'closer' }
        ]
    },
    {
        id: 'dream_vs_reality',
        situation: '"제 꿈을 응원해주실 거죠?" 상대방의 꿈은 현실성이 없어 보입니다.',
        choices: [
            { text: '"무조건 응원할게요! 함께 해요" 전폭 지지한다.', affection: 20, trust: 5, type: 'full_support' },
            { text: '"좋지만 현실도 생각해봐요" 조언한다.', affection: -10, trust: 15, type: 'realistic' },
            { text: '"당신이 행복하면 저도 행복해요" 존중한다.', affection: 15, trust: 18, type: 'respect' }
        ]
    },
    {
        id: 'memory_test',
        situation: '"우리 첫 만남이 언제였죠?" 상대방이 물어보는데 기억이 잘 안 납니다.',
        choices: [
            { text: '정확한 날짜를 맞춘다. (기억력 테스트)', affection: 20, trust: 20, type: 'remember' },
            { text: '"정확히는 기억 안 나지만, 그날 정말 행복했어요" 솔직하게 말한다.', affection: 8, trust: 15, type: 'honest' },
            { text: '대충 날짜를 추측해서 말한다.', affection: -15, trust: -20, type: 'guess' }
        ]
    },
    {
        id: 'future_pressure',
        situation: '"우리 앞으로 어떻게 될까요?" 진지하게 물어봅니다.',
        choices: [
            { text: '"당신과 결혼하고 싶어요" 확신있게 말한다.', affection: 25, trust: 15, type: 'marriage' },
            { text: '"천천히 좋은 방향으로 가요" 신중하게 답한다.', affection: 5, trust: 18, type: 'slow' },
            { text: '"지금이 행복하면 됐죠" 현재에 집중한다.', affection: 10, trust: 5, type: 'present' }
        ]
    },
    {
        id: 'bad_day',
        situation: '오늘 정말 최악의 하루였습니다. 피곤하고 짜증이 납니다. 상대방이 연락합니다.',
        choices: [
            { text: '"오늘은 좀 힘들어서... 내일 통화할게요" 솔직하게 말한다.', affection: 5, trust: 18, type: 'honest' },
            { text: '피곤해도 밝게 대화한다.', affection: 10, trust: -5, type: 'pretend' },
            { text: '"왜 자꾸 연락해요?" 짜증을 낸다.', affection: -25, trust: -30, type: 'irritated' }
        ]
    },
    {
        id: 'diet_support',
        situation: '상대방이 다이어트 중입니다. 맛있는 음식을 먹고 싶어합니다.',
        choices: [
            { text: '"오늘 하루만 치팅데이 해요" 함께 먹자고 한다.', affection: 15, trust: -5, type: 'cheat' },
            { text: '"목표 달성하면 같이 먹어요" 응원한다.', affection: 8, trust: 20, type: 'support' },
            { text: '"다이어트는 내일부터!" 유혹한다.', affection: 12, trust: -15, type: 'tempt' }
        ]
    },
    {
        id: 'hobby_time',
        situation: '상대방이 "요즘 제 취미 시간이 없어요"라고 말합니다.',
        choices: [
            { text: '"제가 시간을 너무 많이 뺏는 건가요?" 미안해한다.', affection: 10, trust: 15, type: 'apologetic' },
            { text: '"그럼 오늘은 취미 즐기세요. 전 괜찮아요" 배려한다.', affection: 15, trust: 20, type: 'considerate' },
            { text: '"저랑 있는 게 취미가 되면 안 되나요?" 농담한다.', affection: 8, trust: 5, type: 'joke' }
        ]
    },
    {
        id: 'financial_disparity',
        situation: '상대방이 비싼 레스토랑 계산서를 보고 미안해합니다. 경제적 차이가 느껴집니다.',
        choices: [
            { text: '"괜찮아요. 다음엔 당신이 사세요" 가볍게 말한다.', affection: 12, trust: 18, type: 'light' },
            { text: '"돈보다 함께 있는 게 중요해요" 위로한다.', affection: 18, trust: 15, type: 'comfort' },
            { text: '"더치페이 할까요?" 제안한다.', affection: -5, trust: 15, type: 'split' }
        ]
    },
    {
        id: 'overthinking',
        situation: '"제가 너무 예민한가요? 요즘 자꾸 걱정돼요" 상대방이 불안해합니다.',
        choices: [
            { text: '"무슨 걱정이에요? 다 이야기해봐요" 들어준다.', affection: 15, trust: 25, type: 'listen' },
            { text: '"예민한 게 아니라 신중한 거예요" 긍정적으로 말한다.', affection: 12, trust: 15, type: 'positive' },
            { text: '"너무 생각 많이 하지 마세요" 가볍게 넘긴다.', affection: -8, trust: -15, type: 'dismiss' }
        ]
    },
    {
        id: 'social_media_like',
        situation: '상대방이 다른 이성의 SNS 게시물에 자주 좋아요를 누릅니다.',
        choices: [
            { text: '아무렇지 않은 척 넘어간다.', affection: 5, trust: 10, type: 'ignore' },
            { text: '"그 사람이랑 친해요?" 가볍게 물어본다.', affection: 0, trust: 5, type: 'ask' },
            { text: '"제 게시물에도 좋아요 눌러주세요" 농담으로 말한다.', affection: 8, trust: 8, type: 'joke' }
        ]
    },
    {
        id: 'late_for_date',
        situation: '약속 시간에 30분이나 늦었습니다. 상대방이 화가 난 것 같습니다.',
        choices: [
            { text: '"정말 죄송해요. 교통이 막혀서..." 솔직하게 사과한다.', affection: -5, trust: 5, type: 'honest_apology' },
            { text: '"미안해요, 큰 일 생겼어요" 거짓말로 둘러댄다.', affection: -10, trust: -20, type: 'lie' },
            { text: '"30분밖에 안 늦었는데..." 변명한다.', affection: -20, trust: -25, type: 'excuse' }
        ]
    },
    {
        id: 'forgot_anniversary',
        situation: '상대방이 기대하던 기념일을 깜빡 잊었습니다. 실망한 표정입니다.',
        choices: [
            { text: '"정말 죄송해요. 지금 당장 만회할게요!" 즉시 행동한다.', affection: -8, trust: -5, type: 'immediate_action' },
            { text: '"미안해요... 제가 잊었어요" 솔직하게 인정한다.', affection: -15, trust: 10, type: 'honest' },
            { text: '"그런 날이었어요? 미안한데 기억 안 나요"', affection: -30, trust: -35, type: 'casual' }
        ]
    },
    {
        id: 'cancel_plan_last_minute',
        situation: '갑자기 친구들과의 약속이 생겨서 데이트를 취소해야 합니다.',
        choices: [
            { text: '"미안해요, 다음에 더 좋은 곳 갈게요" 진심으로 사과한다.', affection: -10, trust: -5, type: 'apologize' },
            { text: '친구를 거절하고 데이트를 우선한다.', affection: 15, trust: 20, type: 'prioritize' },
            { text: '"어쩔 수 없어요. 다음에 봬요" 가볍게 말한다.', affection: -25, trust: -30, type: 'dismissive' }
        ]
    },
    {
        id: 'ignore_message',
        situation: '바빠서 상대방의 메시지를 6시간 동안 확인하지 못했습니다. 서운해합니다.',
        choices: [
            { text: '"정말 바빴어요. 미안해요" 사과한다.', affection: -5, trust: 5, type: 'apologize' },
            { text: '"항상 답장해야 하나요?" 반문한다.', affection: -20, trust: -25, type: 'defensive' },
            { text: '먼저 전화해서 진심으로 사과한다.', affection: 5, trust: 15, type: 'call_apologize' }
        ]
    },
    {
        id: 'rude_to_server',
        situation: '레스토랑 직원이 실수했을 때 당신의 반응을 상대방이 지켜봅니다.',
        choices: [
            { text: '"괜찮아요" 이해하며 넘어간다.', affection: 10, trust: 15, type: 'understanding' },
            { text: '매니저를 부르며 강하게 항의한다.', affection: -15, trust: -20, type: 'harsh' },
            { text: '"이 정도면 괜찮죠?" 상대방에게 물어본다.', affection: 5, trust: 10, type: 'considerate' }
        ]
    },
    {
        id: 'compare_with_ex',
        situation: '무심코 "전 연인은 이런 거 좋아했는데"라고 말했습니다.',
        choices: [
            { text: '"미안해요, 실수였어요" 즉시 사과한다.', affection: -10, trust: -5, type: 'apologize' },
            { text: '아무렇지 않게 넘어간다.', affection: -20, trust: -25, type: 'ignore' },
            { text: '"하지만 당신이 더 좋아요" 만회한다.', affection: -5, trust: -10, type: 'recover' }
        ]
    },
    {
        id: 'broke_promise',
        situation: '약속했던 것을 지키지 못했습니다. 상대방이 실망합니다.',
        choices: [
            { text: '"정말 죄송해요. 다음엔 꼭 지킬게요"', affection: -10, trust: -15, type: 'promise_again' },
            { text: '"제가 약속했나요? 기억이 안 나는데..."', affection: -25, trust: -35, type: 'deny' },
            { text: '즉시 보상할 방법을 찾아 실행한다.', affection: -5, trust: 5, type: 'compensate' }
        ]
    },
    {
        id: 'flirt_with_others',
        situation: '당신이 다른 사람과 너무 친하게 대화하는 모습을 봤다고 합니다.',
        choices: [
            { text: '"오해예요. 그냥 친구예요" 해명한다.', affection: -5, trust: -10, type: 'explain' },
            { text: '"질투하는 거예요?" 웃으며 장난친다.', affection: -15, trust: -20, type: 'joke' },
            { text: '"미안해요. 조심할게요" 진지하게 사과한다.', affection: 5, trust: 10, type: 'serious_apology' }
        ]
    },
    {
        id: 'insensitive_comment',
        situation: '무심코 한 말이 상대방에게 상처를 줬습니다. 표정이 어두워집니다.',
        choices: [
            { text: '"미안해요, 그런 뜻이 아니었어요" 즉시 사과한다.', affection: -5, trust: 0, type: 'apologize' },
            { text: '"너무 예민한 거 아니에요?" 방어적으로 나온다.', affection: -25, trust: -30, type: 'defensive' },
            { text: '왜 기분이 나빴는지 진지하게 물어본다.', affection: 0, trust: 15, type: 'ask_sincerely' }
        ]
    },
    {
        id: 'priority_issue',
        situation: '중요한 날인데 당신이 게임이나 취미에 빠져있습니다.',
        choices: [
            { text: '즉시 중단하고 관심을 돌린다.', affection: 5, trust: 10, type: 'stop' },
            { text: '"잠깐만요, 거의 끝났어요" 계속한다.', affection: -15, trust: -20, type: 'continue' },
            { text: '"조금만 기다려주세요" 부탁한다.', affection: -8, trust: -10, type: 'ask_wait' }
        ]
    },
    {
        id: 'insensitive_comment',
        situation: '상대방이 새로 산 옷을 입고 왔는데, 무심코 "별로네요"라고 말했습니다.',
        choices: [
            { text: '"농담이에요! 정말 잘 어울려요" 즉시 정정한다.', affection: -5, trust: 0, type: 'joke' },
            { text: '"미안해요, 솔직한 게 좋을 것 같아서..." 변명한다.', affection: -18, trust: -15, type: 'excuse' },
            { text: '진심으로 사과하고 왜 기분이 상했는지 듣는다.', affection: -8, trust: 12, type: 'apologize' }
        ]
    },
    {
        id: 'secret_revealed',
        situation: '상대방이 비밀로 부탁한 이야기를 친구들에게 말한 것을 들켰습니다.',
        choices: [
            { text: '"중요한 비밀인 줄 몰랐어요" 변명한다.', affection: -20, trust: -30, type: 'excuse' },
            { text: '진심으로 사과하고 다시는 그러지 않겠다고 약속한다.', affection: -12, trust: -18, type: 'apologize' },
            { text: '"그 정도는 괜찮지 않아요?" 대수롭지 않게 여긴다.', affection: -30, trust: -40, type: 'dismiss' }
        ]
    },
    {
        id: 'comparison_comment',
        situation: '무심코 "친구는 이렇게 하던데?"라며 상대방과 다른 사람을 비교했습니다.',
        choices: [
            { text: '"비교한 게 아니라 그냥 이야기한 거예요" 해명한다.', affection: -15, trust: -18, type: 'excuse' },
            { text: '"미안해요, 당신이 제일 좋아요" 즉시 사과한다.', affection: -5, trust: 5, type: 'apologize' },
            { text: '침묵하며 왜 기분이 나빴는지 진지하게 듣는다.', affection: -8, trust: 15, type: 'listen' }
        ]
    },
    {
        id: 'lack_of_interest',
        situation: '상대방이 몇 주간 준비한 발표에 대해 이야기하는데, 당신은 딴생각을 하고 있었습니다.',
        choices: [
            { text: '"죄송해요, 다시 말씀해주세요" 솔직하게 인정한다.', affection: -10, trust: 8, type: 'honest' },
            { text: '들은 척하며 "잘했겠네요" 대충 넘긴다.', affection: -22, trust: -25, type: 'pretend' },
            { text: '"요즘 제가 좀 피곤해서..." 변명한다.', affection: -15, trust: -12, type: 'excuse' }
        ]
    },
    {
        id: 'no_help_offered',
        situation: '상대방이 이사를 하는데, 당신은 "바쁘다"며 도와주지 않았습니다.',
        choices: [
            { text: '"정말 급한 일이 있었어요" 사정을 설명한다.', affection: -12, trust: -15, type: 'explain' },
            { text: '늦게라도 달려가서 도와준다.', affection: -5, trust: 15, type: 'help_late' },
            { text: '"이사 업체 부르면 되잖아요" 대수롭지 않게 말한다.', affection: -28, trust: -35, type: 'dismiss' }
        ]
    },
    {
        id: 'lie_caught',
        situation: '어제 "야근"한다고 했는데, 친구들과 술 마신 게 SNS로 들통났습니다.',
        choices: [
            { text: '진심으로 사과하고 왜 거짓말했는지 설명한다.', affection: -15, trust: -25, type: 'apologize' },
            { text: '"야근 끝나고 잠깐 만난 거예요" 둘러댄다.', affection: -25, trust: -40, type: 'more_lies' },
            { text: '"가끔은 제 시간도 필요해요" 솔직하게 말한다.', affection: -10, trust: -15, type: 'honest' }
        ]
    },
    {
        id: 'broken_promise',
        situation: '약속했던 여행을 갑자기 취소했습니다. 상대방은 이미 모든 준비를 끝냈습니다.',
        choices: [
            { text: '진심으로 사과하고 다른 날짜를 다시 잡는다.', affection: -10, trust: -12, type: 'reschedule' },
            { text: '"어쩔 수 없었어요" 변명만 한다.', affection: -25, trust: -30, type: 'excuse' },
            { text: '준비한 것에 대해 보상하고 다음엔 꼭 가겠다고 약속한다.', affection: -5, trust: -8, money: -300000, type: 'compensate' }
        ]
    },
    {
        id: 'rude_to_family',
        situation: '상대방의 가족 모임에서 무례한 태도를 보였습니다.',
        choices: [
            { text: '"원래 제 성격이 이래요" 대수롭지 않게 넘긴다.', affection: -35, trust: -40, type: 'dismiss' },
            { text: '진심으로 사과하고 다음엔 조심하겠다고 약속한다.', affection: -15, trust: -18, type: 'apologize' },
            { text: '"너무 긴장했어요" 솔직하게 말하며 사과한다.', affection: -10, trust: -8, type: 'honest' }
        ]
    },
    {
        id: 'selfish_decision',
        situation: '상대방과 상의 없이 혼자 중요한 결정을 내렸습니다.',
        choices: [
            { text: '"당신도 좋아할 줄 알았어요" 변명한다.', affection: -20, trust: -25, type: 'excuse' },
            { text: '미안하다며 함께 다시 결정하자고 한다.', affection: -8, trust: 5, type: 'redo' },
            { text: '"이미 결정한 건데..." 고집을 부린다.', affection: -30, trust: -35, type: 'stubborn' }
        ]
    },
    {
        id: 'ignore_feelings',
        situation: '상대방이 화나서 이야기하는데, "왜 이렇게 예민해?"라고 말했습니다.',
        choices: [
            { text: '진심으로 사과하고 다시 이야기를 들어준다.', affection: -12, trust: -8, type: 'apologize' },
            { text: '"사실 그렇잖아요" 계속 방어적으로 나온다.', affection: -32, trust: -38, type: 'defensive' },
            { text: '왜 화가 났는지 진지하게 물어본다.', affection: -8, trust: 10, type: 'ask' }
        ]
    },
    {
        id: 'forgot_important_event',
        situation: '상대방의 중요한 시험/면접일을 깜빡하고 연락도 안 했습니다.',
        choices: [
            { text: '"요즘 너무 바빴어요" 변명한다.', affection: -20, trust: -22, type: 'excuse' },
            { text: '진심으로 사과하고 어떻게 됐는지 물어본다.', affection: -8, trust: -5, type: 'apologize' },
            { text: '"다음엔 기억할게요" 가볍게 넘긴다.', affection: -25, trust: -28, type: 'dismiss' }
        ]
    },
    {
        id: 'jealousy_overreaction',
        situation: '상대방이 이성 친구와 이야기하는 것을 보고 심하게 질투했습니다.',
        choices: [
            { text: '진심으로 사과하고 믿는다고 말한다.', affection: -8, trust: -15, type: 'apologize' },
            { text: '"그래도 기분 나빴어요" 계속 삐진다.', affection: -18, trust: -25, type: 'sulk' },
            { text: '"앞으로 이성 친구 좀 조심해주세요" 요구한다.', affection: -22, trust: -30, type: 'demand' }
        ]
    },
    {
        id: 'credit_stealing',
        situation: '상대방이 도와준 일을 혼자 한 것처럼 다른 사람들에게 말했습니다.',
        choices: [
            { text: '즉시 바로잡고 상대방의 공로를 인정한다.', affection: -5, trust: 0, type: 'correct' },
            { text: '"실수였어요" 나중에 변명한다.', affection: -20, trust: -30, type: 'excuse' },
            { text: '"같이 한 거잖아요" 대수롭지 않게 여긴다.', affection: -28, trust: -38, type: 'dismiss' }
        ]
    },
    {
        id: 'harsh_criticism',
        situation: '상대방의 취미나 관심사를 "시간 낭비"라고 비판했습니다.',
        choices: [
            { text: '"걱정돼서 그런 거예요" 해명한다.', affection: -18, trust: -15, type: 'excuse' },
            { text: '진심으로 사과하고 앞으로 존중하겠다고 약속한다.', affection: -10, trust: -8, type: 'apologize' },
            { text: '"사실이잖아요" 계속 주장한다.', affection: -35, trust: -40, type: 'insist' }
        ]
    },
    {
        id: 'attention_seeking',
        situation: '상대방이 힘든 이야기를 하는데, "저도 힘들어요"라며 화제를 돌렸습니다.',
        choices: [
            { text: '"미안해요, 당신 이야기를 들을게요" 다시 돌린다.', affection: -8, trust: 5, type: 'refocus' },
            { text: '계속 자신의 이야기를 한다.', affection: -25, trust: -30, type: 'continue' },
            { text: '"같이 힘들어요" 공감하려 한다.', affection: -12, trust: -10, type: 'empathy_attempt' }
        ]
    }
];

// ============================================
// 첫 만남 시나리오
// ============================================
const FIRST_MEETING_SCENARIOS = {
    perfectionist: {
        situation: '고급 카페에서 우연히 만난 그녀. 완벽한 자세로 책을 읽고 있습니다. 어떻게 다가갈까요?',
        choices: [
            {
                text: '"그 책 재미있나요? 저도 읽어봤는데..."라고 말을 건넨다',
                affection: 12,
                trust: 15,
                type: 'intellectual'
            },
            {
                text: '"혼자 오셨어요? 같이 커피 한 잔 어때요?"',
                affection: 5,
                trust: 5,
                type: 'casual'
            },
            {
                text: '조용히 옆 자리에 앉아 책을 읽는다',
                affection: 8,
                trust: 10,
                type: 'respectful'
            }
        ]
    },
    positive: {
        situation: '공원에서 강아지와 즐겁게 놀고 있는 그녀. 밝은 미소가 인상적입니다. 어떻게 다가갈까요?',
        choices: [
            {
                text: '"강아지 정말 귀엽네요! 이름이 뭐예요?"라고 밝게 말을 건넨다',
                affection: 15,
                trust: 12,
                type: 'friendly'
            },
            {
                text: '강아지에게 간식을 주며 자연스럽게 대화를 시작한다',
                affection: 18,
                trust: 15,
                type: 'thoughtful'
            },
            {
                text: '"저도 강아지 좋아하는데, 같이 산책할까요?"',
                affection: 12,
                trust: 10,
                type: 'direct'
            }
        ]
    },
    tsundere: {
        situation: '서점에서 만화책을 고르던 그녀. 당신이 쳐다보자 얼굴을 붉히며 돌아섭니다. 어떻게 다가갈까요?',
        choices: [
            {
                text: '"그 만화 재미있어요. 저도 좋아하는데..."라고 부드럽게 말을 건넨다',
                affection: 15,
                trust: 12,
                type: 'gentle'
            },
            {
                text: '"취향 좋으시네요! 같이 만화 이야기 나눠요"라고 적극적으로 말한다',
                affection: 8,
                trust: 8,
                type: 'enthusiastic'
            },
            {
                text: '멀리서 미소만 짓고 자신의 책을 고른다',
                affection: 10,
                trust: 15,
                type: 'patient'
            }
        ]
    },
    career: {
        situation: '비즈니스 세미나장에서 만난 그녀. 질문을 하며 논리정연하게 발표자를 압도하고 있습니다. 어떻게 다가갈까요?',
        choices: [
            {
                text: '세미나 후 "좋은 질문이었습니다. 커피 마시면서 이야기 나눠볼까요?"',
                affection: 15,
                trust: 18,
                type: 'professional'
            },
            {
                text: '명함을 건네며 "당신의 관점이 인상적이었습니다"',
                affection: 12,
                trust: 15,
                type: 'respectful'
            },
            {
                text: '"정말 멋있었어요!"라고 칭찬한다',
                affection: 8,
                trust: 8,
                type: 'admiring'
            }
        ]
    }
};
