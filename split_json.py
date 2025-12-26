import json

# data.json 읽기
with open('data.json', 'r', encoding='utf-8') as f:
    all_data = json.load(f)

# 각 직원별로 파일 생성
for staff_name, staff_data in all_data.items():
    filename = f'data/{staff_name}.json'
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(staff_data, f, ensure_ascii=False, indent=2)
    print(f'✅ {filename} 생성 완료')

print(f'\n총 {len(all_data)}개 파일 생성 완료!')