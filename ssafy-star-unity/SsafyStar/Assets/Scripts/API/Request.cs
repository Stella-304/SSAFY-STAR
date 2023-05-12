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
            request.method = "PATCH"; // patch�� �����Ѵٰ� �Ѵ�.
            byte[] jsonToSend = new System.Text.UTF8Encoding().GetBytes(input);
            request.uploadHandler = new UploadHandlerRaw(jsonToSend);
            request.downloadHandler = (DownloadHandler)new DownloadHandlerBuffer();
            request.SetRequestHeader("Authorization", token);
            yield return request.SendWebRequest();

            if (request.result == UnityWebRequest.Result.Success)
            {
                if (type.Equals("nickname"))
                {
                    Debug.Log("nickname ���� ����");
                    PlayerPrefs.SetString("Nickname", input);
                    SceneManager.LoadScene("Lobby");
                }

                request.Dispose(); // �޸� ������ ���� �ϱ�
            }
            else
            {
                if (type.Equals("nickname"))
                {
                    Debug.Log("nickname ���� ����");
                    MenuController.Instance.PrintError("����");
                }
                request.Dispose(); // �޸� ������ ���� �ϱ�
            }
            request.Dispose();
        }

    }

    public IEnumerator ApiGetRequest(string api,string input, string type, string token)
    {
        //���� https://timeboxstory.tistory.com/83
        using (UnityWebRequest request = UnityWebRequest.Get(apiUrl + api))
        {
            request.downloadHandler = (DownloadHandler)new DownloadHandlerBuffer();
            request.SetRequestHeader("Authorization", token);
            yield return request.SendWebRequest();

            if (request.result == UnityWebRequest.Result.Success)
            {
                if (type.Equals("nickname"))
                {
                    Debug.Log("api get : �г��� �ߺ� Ȯ�� : ����");
                    MenuController.Instance.SetNickName();
                }
                //����
                request.Dispose(); // �޸� ������ ���� �ϱ�
            }
            else
            {
                //����
                if (type.Equals("nickname"))
                {
                    Debug.Log("api get : �г��� �ߺ� Ȯ�� : ����");
                    MenuController.Instance.PrintError("�ߺ�");
                }
                request.Dispose(); // �޸� ������ ���� �ϱ�
            }
            request.Dispose();
        }

    }
}
