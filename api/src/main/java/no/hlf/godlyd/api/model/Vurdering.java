package no.hlf.godlyd.api.model;

import com.fasterxml.jackson.annotation.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;

@Entity
@Table(name = "vurdering")
@EntityListeners(AuditingEntityListener.class)
@JsonIdentityInfo(generator=ObjectIdGenerators.PropertyGenerator.class, property="id")
@JsonIgnoreProperties(value = "dato", allowGetters = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Vurdering implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.DETACH)
    @JoinColumn(name = "sted")
    private Sted sted;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.DETACH)
    @JoinColumn(name = "registrator")
    private Bruker registrator;

    @Column(nullable = false)
    private LocalDate dato;

    private String kommentar;

    @Enumerated(EnumType.STRING)
    private VurderingsType vurderingsType;

    @Enumerated(EnumType.ORDINAL)
    @Column(columnDefinition = "smallint")
    private Rangering rangering;

    public Vurdering(Sted sted, Bruker registrator, String kommentar, VurderingsType vurderingsType, Rangering rangering) {
        this.sted = sted;
        this.registrator = registrator;
        this.kommentar = kommentar;
        this.vurderingsType = vurderingsType;
        this.rangering = rangering;
    }

    private Vurdering(){}

    //Getters and setters
    public Integer getId() { return id; }

    public void setId(Integer id) { this.id = id; }

    public Sted getSted() { return sted; }

    public void setSted(Sted sted) {
        this.sted = sted;
    }

    public Bruker getRegistrator() { return registrator; }

    public void setRegistrator(Bruker registrator) {
        this.registrator = registrator;
    }

    public LocalDate getDato() {
        return dato;
    }

    public void setDato(LocalDate dato) { this.dato = dato; }

    public String getKommentar() { return kommentar; }

    public void setKommentar(String kommentar) { this.kommentar = kommentar; }

    public VurderingsType getVurderingsType() {
        return vurderingsType;
    }

    public void setVurderingsType(VurderingsType vurderingsType) {
        this.vurderingsType = vurderingsType;
    }

    public Rangering getRangering() {
        return rangering;
    }

    public void setRangering(Rangering rangering) {
        this.rangering = rangering;
    }

    @Override
    public String toString() {
        return "Vurdering{" +
                ", kommentar='" + kommentar + '\'' +
                ", vurderingsType=" + vurderingsType +
                ", rangering=" + rangering +
                '}';
    }
}
