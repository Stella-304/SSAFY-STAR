using System.Collections;
using System.Collections.Generic;
using Unity.VisualScripting.Antlr3.Runtime;
using UnityEngine;
using UnityEngine.Networking;
using UnityEngine.SceneManagement;

public class Request : MonoBehaviour
{
    private string apiUrl = "https://ssafy-star.com";

    public static Request Instance;

    private void Awake()
    {
        Instance = this;
    }

    public IEnumerator ApiPatchRequest(string api, string input, string type, string token="")
    {
        using (UnityWebRequest request = UnityWebRequest.Put(apiUrl + api, input))
        {
            request.method = "PATCH"; // patch로 전송한다고 한다.
            byte[] jsonToSend = new System.Text.UTF8Encoding().GetBytes(input);
            request.uploadHandler = new UploadHandlerRaw(jsonToSend);
            request.downloadHandler = (DownloadHandler)new DownloadHandlerBuffer();
            request.SetRequestHeader("Authorization", token);
            yield return request.SendWebRequest();

            if (request.result == UnityWebRequest.Result.Success)
            {
                if (type.Equals("nickname"))
                {
                    Debug.Log("nickname 설정 성공");
                    PlayerPrefs.SetString("Nickname", input);
                    SceneManager.LoadScene("Lobby");
                }

                request.Dispose(); // 메모리 누수로 해제 하기
            }
            else
            {
                if (type.Equals("nickname"))
                {
                    Debug.Log("nickname 설정 실패");
                    MenuController.Instance.PrintError("실패");
                }
                request.Dispose(); // 메모리 누수로 해제 하기
            }
            request.Dispose();
        }

    }

    public IEnumerator ApiGetRequest(string api,string input, string type, string token)
    {
        //참고 https://timeboxstory.tistory.com/83
        using (UnityWebRequest request = UnityWebRequest.Get(apiUrl + api))
        {
            request.downloadHandler = (DownloadHandler)new DownloadHandlerBuffer();
            request.SetRequestHeader("Authorization", token);
            yield return request.SendWebRequest();

            if (request.result == UnityWebRequest.Result.Success)
            {
                if (type.Equals("nickname"))
                {
                    Debug.Log("api get : 닉네임 중복 확인 : 성공");
                    MenuController.Instance.SetNickName();
                }
                //성공
                request.Dispose(); // 메모리 누수로 해제 하기
            }
            else
            {
                //에러
                if (type.Equals("nickname"))
                {
                    Debug.Log("api get : 닉네임 중복 확인 : 실패");
                    MenuController.Instance.PrintError("중복");
                }
                request.Dispose(); // 메모리 누수로 해제 하기
            }
            request.Dispose();
        }

    }
}
