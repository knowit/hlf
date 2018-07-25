package no.hlf.godlyd.api.model;

import com.fasterxml.jackson.annotation.*;

import javax.persistence.*;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "sted")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Sted implements Serializable{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotBlank
    @NotNull
    @Column(unique = true)
    private String placeId;

    @OneToMany(mappedBy = "sted", fetch = FetchType.LAZY, orphanRemoval = true)
    private List<Vurdering> vurderinger;

    private long timestamp;

    public Sted(){}

    public Sted(String placeId){
        this.placeId = placeId;
    }


    public void addVurdering(Vurdering vurdering){
        this.vurderinger.add(vurdering);
        vurdering.setSted(this);
    }

    public void removeVurdering(Vurdering vurdering){
        vurderinger.remove(vurdering);
    }

    // Getters og setters
    public Integer getId() { return id; }

    public void setId(Integer id) { this.id = id; }

    public String getPlaceId() { return placeId; }

    public void setPlaceId(String placeId) { this.placeId = placeId; }

    @JsonIgnore
    public List<Vurdering> getVurderinger() { return vurderinger; }

    public void setVurderinger(List<Vurdering> vurderinger) { this.vurderinger = vurderinger; }

    public void setTimestamp(){
        this.timestamp = System.currentTimeMillis();
    }
}
