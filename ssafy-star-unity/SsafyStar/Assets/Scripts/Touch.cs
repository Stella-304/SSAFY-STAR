using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Touch : MonoBehaviour
{
    [Tooltip("∆‰¿Ã¡ˆ url")]
    public string url;
    private void OnMouseDown()
    {
        Application.OpenURL(url);
    }
}
