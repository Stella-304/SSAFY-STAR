using UnityEngine;

public class Touch : MonoBehaviour
{
    [Tooltip("ÆäÀÌÁö url")]
    public string url;
    private void OnMouseDown()
    {
        Application.OpenURL(url);
    }
}
