import java.io.IOException;
import java.util.Arrays;


class Solution {
    public int solution(int[][] targets) throws IOException {

        if(targets.length == 1) return 1;

        Arrays.sort(targets, (o1, o2) -> {

            if (o1[0] > o2[0]) {
                return 1;
            }
            else if (o1[0] == o2[0]) {
                if(o1[1] > o2[1]) {
                    return 1;
                }
                return -1;
            }

            return -1;
        });
        int now = 0;
        int idx = 1;
        int answer = 1;

        while(idx < targets.length - 1) {
            System.out.println(11111);
            if(targets[now][1] > targets[idx][0]) {
                idx++;
            }
            else {
                now = idx;
                answer++;
            }
        }

        return answer;
    }
}
public class Main {
    public void main(String[] args) throws IOException {
        Solution solution = new Solution();
        int n = solution.solution(new int[][]{{3,5}});
        System.out.println(n);
    }
}