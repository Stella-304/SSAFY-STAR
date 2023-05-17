import java.util.Arrays;

/*
* 1. 배열을 뒤 원소의 내림차순으로 정렬
* 2-1. 지금까지의 구간에 현재 미사일이 포함되면 구간을 더 좁은 공간으로 갱신 후 계속
* 2-2. 포함되지 않으면 미사일을 한 발 더 쏘고 시작점 갱신
*
* - 문제의 조건에서
*   1 ≤ targets의 길이 ≤ 500,000 => 미사일은 1개 이상 존재
*   0 ≤ s < e ≤ 100,000,000 => 미사일의 비행 길이가 0보다 큼
*
* - 2-1 과정에서
*   현재 끝점이 현재까지의 최대 시작점보다 크다면 무조건 포함 됨
* */

class Solution {
    public int solution(int[][] targets) {
        int answer = 0;

        Arrays.sort(targets, (o1, o2) -> o2[1] - o1[1]);

        int start = Integer.MAX_VALUE;

        for (int[] target : targets) {

            if(target[1] > start) {
                start = Math.max(start, target[0]);
            }
            else {
                start = target[0];
                answer++;
            }
        }

        return answer;
    }
}