using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using TMPro;

public class BlockGame : MonoBehaviour
{
    #region 태그에 따른 함수호출
    //void Awake() { if (CompareTag("GameManager")) Awake_GM(); }

    //void Update() { if (CompareTag("GameManager")) Update_GM(); }

    //void FixedUpdate() { if (CompareTag("GameManager")) FixedUpdate_GM(); }

    //void Start() { if (CompareTag("Ball")) Start_BALL(); }

    //void OnCollisionEnter2D(Collision2D col) { if (CompareTag("Ball")) StartCoroutine(OnCollisionEnter2D_BALL(col)); }

    //void OnTriggerEnter2D(Collider2D col) { if (CompareTag("Ball")) StartCoroutine(OnTriggerEnter2D_BALL(col)); }
    #endregion

    #region GameManager.Cs
    [Header("GameManagerValue")]
    public float groundY = 55.5f;
    public GameObject P_Ball, P_GreenOrb, P_Block, P_ParticleBlue, P_ParticleGreen, P_ParticleRed;
    public GameObject BallPreview, Arrow, GameOverPanel, BallCountTextObj, BallPlusTextObj;
    public Transform GreenBallGroup, BlockGroup, BallGroup;
    public LineRenderer MouseLR, BallLR;
    public TMP_Text BestScoreText, ScoreText, BallCountText, BallPlusText, FinalScoreText, NewRecordText;
    public Color[] blockColor;
    public Color greenColor;
    public AudioSource S_GameOver, S_GreenOrb, S_Plus;
    public AudioSource[] S_Block;
    public Quaternion QI = Quaternion.identity;
    public bool shotTrigger, shotable;
    public Vector3 veryFirstPos;

    Vector3 firstPos, secondPos, gap;
    int score, timerCount, launchIndex;
    bool timerStart, isDie, isNewRecord, isBlockMoving;
    float timeDelay;

    #region 시작
    void Awake_GM()
    {
        //// 9:16 고정해상도 카메라
        //Camera camera = Camera.main;
        //Rect rect = camera.rect;
        //float scaleheight = ((float)Screen.width / Screen.height) / ((float)9 / 16); // (가로 / 세로)
        //float scalewidth = 1f / scaleheight;
        //if (scaleheight < 1)
        //{
        //    rect.height = scaleheight;
        //    rect.y = (1f - scaleheight) / 2f;
        //}
        //else
        //{
        //    rect.width = scalewidth;
        //    rect.x = (1f - scalewidth) / 2f;
        //}
        //camera.rect = rect;


        // 시작
        //BlockGenerator();
        //BestScoreText.text = "최고기록 : " + PlayerPrefs.GetInt("BestScore").ToString();
    }



    //public void Restart() => SceneManager.LoadScene(SceneManager.GetActiveScene().buildIndex);



    //public void VeryFirstPosSet(Vector3 pos) { if (veryFirstPos == Vector3.zero) veryFirstPos = pos; }
    #endregion

    #endregion

}
